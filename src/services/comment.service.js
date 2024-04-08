const httpStatus = require('http-status');

const { Comment } = require('../models');
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
  const comment = await Comment.create(commentBody);
  return comment;
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

const updateCommentById = async (commentId, updateBody) => {
  const comment = await getCommentById(commentId);
  Object.assign(comment, updateBody);
  await comment.save();
  return comment;
};

const deleteCommentById = async (commentId) => {
  const comment = await getCommentById(commentId);
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
};
