const httpStatus = require('http-status');
const { Post, User } = require('../models');
const ApiError = require('../utils/ApiError');
const { postMessage } = require('../messages');
const { KEY_CACHE } = require('../constants');
const generateUniqueSlug = require('../utils/generateUniqueSlug');
const cacheService = require('./cache.service');

const cacheKeyListKey = `${KEY_CACHE}:cacheKeyList`;

const getPostBySlug = async (slug) => {
  const post = await Post.findOne({ slug }).populate([
    {
      path: 'userId',
      select: ['avatar', 'username'],
    },
    {
      path: 'categories',
      select: ['name'],
    },
    {
      path: 'comments',
      match: {
        check: true,
        parent: null,
      },
      populate: [
        {
          path: 'userId',
          select: ['avatar', 'username'],
        },
        {
          path: 'replies',
          match: {
            check: true,
          },
          populate: [
            {
              path: 'userId',
              select: ['avatar', 'username'],
            },
          ],
        },
      ],
    },
  ]);
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

  const cacheKeys = cacheService.get(cacheKeyListKey) || [];
  cacheKeys.forEach((key) => cacheService.del(key));
  cacheService.del(cacheKeyListKey);

  return post;
};

const getPostsByUser = async (userId, filter, page, pageSize, sortBy) => {
  const key = `${KEY_CACHE}:${userId}:${filter}:posts:${page}:${pageSize}:${sortBy}`;
  const postsCache = cacheService.get(key);
  if (postsCache) return postsCache;

  let where = {};
  if (filter) {
    where = { title: { $regex: filter, $options: 'i' } };
  }

  const skip = (page - 1) * pageSize;
  const total = await Post.find({ userId }).find(where).countDocuments();
  const pages = Math.ceil(total / pageSize);

  const posts = await Post.find({ userId })
    .find(where)
    .skip(skip)
    .limit(pageSize)
    .populate([
      {
        path: 'userId',
        select: ['avatar', 'username', 'isVerify'],
      },
      {
        path: 'categories',
        select: ['name'],
      },
    ])
    .sort({ createdAt: sortBy });

  cacheService.set(key, { posts, total, page, pageSize, pages });

  let cacheKeys = cacheService.get(cacheKeyListKey) || [];
  if (!cacheKeys.includes(key)) {
    cacheKeys.push(key);
    cacheService.set(cacheKeyListKey, cacheKeys);
  }

  return { posts, total, page, pageSize, pages };
};

const getAllPosts = async (filter, page, pageSize, sortBy) => {
  const key = `${KEY_CACHE}:${filter}:posts:${page}:${pageSize}:${sortBy}`;
  const postsCache = cacheService.get(key);
  if (postsCache) return postsCache;

  let where = {};
  if (filter) {
    where = { title: { $regex: filter, $options: 'i' } };
  }

  const skip = (page - 1) * pageSize;
  const total = await Post.find(where).countDocuments();
  const pages = Math.ceil(total / pageSize);

  const posts = await Post.find(where)
    .skip(skip)
    .limit(pageSize)
    .populate([
      {
        path: 'userId',
        select: ['avatar', 'username', 'isVerify'],
      },
      {
        path: 'categories',
        select: ['name'],
      },
    ])
    .sort({ createdAt: sortBy });

  cacheService.set(key, { posts, total, page, pageSize, pages });

  let cacheKeys = cacheService.get(cacheKeyListKey) || [];
  if (!cacheKeys.includes(key)) {
    cacheKeys.push(key);
    cacheService.set(cacheKeyListKey, cacheKeys);
  }

  return { posts, total, page, pageSize, pages };
};

const updatePostById = async (userId, postId, updateBody) => {
  const post = await getPostById(postId);
  const user = await User.findById(userId);

  if (userId !== String(post.userId) && user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, postMessage().FORBIDDEN);
  }

  post.slug = await generateUniqueSlug(updateBody.title, Post);
  Object.assign(post, updateBody);

  await post.save();

  const cacheKeys = cacheService.get(cacheKeyListKey) || [];
  cacheKeys.forEach((key) => cacheService.del(key));
  cacheService.del(cacheKeyListKey);

  return post;
};

const deletePostById = async (userId, postId) => {
  const post = await getPostById(postId);
  const user = await User.findById(userId);

  if (userId !== String(post.userId) && user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, postMessage().FORBIDDEN);
  }

  await post.deleteOne();

  const cacheKeys = cacheService.get(cacheKeyListKey) || [];
  cacheKeys.forEach((key) => cacheService.del(key));
  cacheService.del(cacheKeyListKey);

  return post;
};

module.exports = {
  getPostBySlug,
  getPostById,
  createPost,
  getAllPosts,
  updatePostById,
  deletePostById,
  getPostsByUser,
};
