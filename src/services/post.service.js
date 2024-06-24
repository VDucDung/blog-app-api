const httpStatus = require('http-status');

const { Post, User } = require('../models');
const ApiError = require('../utils/ApiError');
const { postMessage } = require('../messages');
const cacheService = require('../services/cache.service');
const generateUniqueSlug = require('../utils/generateUniqueSlug');
const { KEY_CACHE } = require('../constants');

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
  return post;
};

const getAllPosts = async (filter, page, pageSize, sortBy) => {
  const key = `${KEY_CACHE}:posts`;
  const postsCache = cacheService.get(key);
  if (postsCache) return postsCache;

  let where = {};
  if (filter) {
    where.$or = [
      { title: { $regex: filter, $options: 'i' } },
      { caption: { $regex: filter, $options: 'i' } },
      { userId: filter },
    ].filter(Boolean);
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
  cacheService.del(`${KEY_CACHE}:posts`);

  return post;
};

const deletePostById = async (userId, postId) => {
  const post = await getPostById(postId);
  const user = await User.findById(userId);

  if (userId !== String(post.userId) && user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, postMessage().FORBIDDEN);
  }

  await post.deleteOne();

  cacheService.del(`${KEY_CACHE}:posts`);
  return post;
};

module.exports = {
  getPostBySlug,
  getPostById,
  createPost,
  getAllPosts,
  updatePostById,
  deletePostById,
};
