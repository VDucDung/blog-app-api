const httpStatus = require('http-status');

const { Post } = require('../models');
const ApiError = require('../utils/ApiError');
const { postMessage } = require('../messages');
const SearchFeature = require('../utils/SearchFeature');
const cacheService = require('../services/cache.service');
const generateUniqueSlug = require('../utils/generateUniqueSlug');
const SearchService = require('../utils/SearchService');

const getPostsByuserId = async (userId) => {
  const posts = await Post.find({ userId });
  return posts;
};
const getPostByTitle = async (title) => {
  const post = await Post.findOne({ title });
  return post;
};
const getPostBySlug = async (slug) => {
  const post = await Post.findOne({ slug });
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
  postBody.slug = await generateUniqueSlug(postBody.title, Post);

  const post = await Post.create(postBody);
  return post;
};

const getAllPosts = async (requestQuery) => {
  const key = JSON.stringify(requestQuery);
  const postsCache = cacheService.get(key);
  if (postsCache) return postsCache;

  const searchService = new SearchService(Post);
  const { results, ...detailResult } = await searchService.getResults(requestQuery, ['title', 'userId', 'slug']);

  cacheService.set(key, { posts: results, ...detailResult });
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
  getPostsByuserId,
  getPostByTitle,
  getPostBySlug,
  getPostById,
  createPost,
  getAllPosts,
  updatePostById,
  deletePostById,
};
