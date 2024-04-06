const { Post } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { postMessage } = require('../messages');
const SearchFeature = require('../utils/SearchFeature');

const getUsersByuserId = async (userId) => {
  const post = await Post.find({ userId });
  return post;
};
const getUserByTitle = async (title) => {
  const post = await Post.findOne({ title });
  return post;
};
const getUserByDesc = async (desc) => {
  const post = await Post.findOne({ desc });
  return post;
};
const getPostById = async (id) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, postMessage().NOT_FOUND);
  }
  return post;
};

const createPost = async (postBody) => {
  if ((await getUserByTitle(postBody.title)) && (await getUserByDesc(postBody.desc))) {
    throw new ApiError(httpStatus.BAD_REQUEST, postMessage().ALREADY_EXISTS);
  }
  const post = await post.create(postBody);
  return post;
};

const getUsersByKeyword = async (requestQuery) => {
  const searchFeatures = new SearchFeature(Post);
  const { results, ...detailResult } = await searchFeatures.getResults(requestQuery, ['title', 'userId', 'desc']);
  return { posts: results, ...detailResult };
};

const updatePostById = async (postId, updateBody) => {
  const post = await getPostById(postId);
  Object.assign(post, updateBody);
  await post.save();
  return post;
};

const deletePostById = async (postId) => {
  const post = await getPostById(postId);
  await post.deleteOne();
  return post;
};

module.exports = {
  getUsersByuserId,
  getUserByTitle,
  getUserByDesc,
  getPostById,
  createPost,
  getUsersByKeyword,
  updatePostById,
  deletePostById,
};
