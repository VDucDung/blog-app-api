const httpStatus = require('http-status');
const mongoose = require('mongoose');

const { Comment, Post } = require('../models');
const ApiError = require('../utils/ApiError');
const cacheService = require('./cache.service');
const { commentMessage } = require('../messages');
const SearchFeature = require('../utils/SearchFeature');

const getCommentsByuserId = async (userId) => {
  const comments = await Comment.find({ userId });
  return comments;
};
const getCommentsBypostId = async (postId) => {
  const comments = await Comment.find({ postId });
  return comments;
};
const getCommentById = async (id) => {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, commentMessage().NOT_FOUND);
  }
  return comment;
};

const createComment = async (commentBody) => {
  const { comment, slug, parent, replyOnUser } = commentBody;

  const post = await Post.findOne({ slug });

  const newComment = new Comment({
    comment,
    postId: post._id,
    userId: commentBody.userId,
    parent: parent || null,
    replyOnUser: replyOnUser || null,
  });

  const savedComment = await newComment.save();

  return savedComment;
};

const getCommentsByKeyword = async (requestQuery) => {
  const key = JSON.stringify(requestQuery);
  const commentsCache = cacheService.get(key);
  if (commentsCache) return commentsCache;

  const searchFeatures = new SearchFeature(Comment);
  const { results, ...detailResult } = await searchFeatures.getResults(requestQuery, ['comment', 'userId', 'postId']);

  cacheService.set(key, { comments: results, ...detailResult });
  return { comments: results, ...detailResult };
};

const getAllComments = async (filter, page, pageSize, sortBy) => {
  const commentsCache = cacheService.get(`${filter}:${page}:${pageSize}:${sortBy}:comments`);
  if (commentsCache) return commentsCache;

  let where = {};
  if (filter) {
    where.$or = [
      { comment: { $regex: filter, $options: 'i' } },
      // Kiểm tra postId và userId như ObjectId
      { postId: mongoose.Types.ObjectId.isValid(filter) ? mongoose.Types.ObjectId(filter) : null },
      { userId: mongoose.Types.ObjectId.isValid(filter) ? mongoose.Types.ObjectId(filter) : null },
    ].filter(Boolean); // Loại bỏ các điều kiện null
  }

  const skip = (page - 1) * pageSize;
  const total = await Comment.find(where).countDocuments();
  const pages = Math.ceil(total / pageSize);

  const comments = await Comment.find(where)
    .skip(skip)
    .limit(pageSize)
    .populate([
      {
        path: 'userId',
        select: ['avatar', 'username', 'isVerify'],
      },
      {
        path: 'parent',
        populate: [
          {
            path: 'userId',
            select: ['avatar', 'username'],
          },
        ],
      },
      {
        path: 'replyOnUser',
        select: ['avatar', 'username'],
      },
      {
        path: 'postId',
        select: ['slug', 'title'],
      },
    ])
    .sort({ updatedAt: sortBy });

  console.log(comments);
  cacheService.set(`${filter}:${page}:${pageSize}:${sortBy}:comments`, { comments, total, page, pageSize, pages });

  return { comments, total, page, pageSize, pages };
};

const updateCommentById = async (commentId, updateBody) => {
  const { comment, check } = updateBody;
  const results = await getCommentById(commentId);

  results.comment = comment || results.comment;
  results.check = typeof check !== 'undefined' ? check : results.check;

  const updatedComment = await results.save();
  return updatedComment;
};

const deleteCommentById = async (commentId) => {
  const comment = await getCommentById(commentId);

  await Comment.deleteMany({ parent: comment._id });
  await comment.deleteOne();

  return comment;
};

module.exports = {
  getCommentsByuserId,
  getCommentsBypostId,
  getCommentById,
  createComment,
  getCommentsByKeyword,
  updateCommentById,
  deleteCommentById,
  getAllComments,
};
