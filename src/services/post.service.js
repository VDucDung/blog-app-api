const httpStatus = require('http-status');

const { Post } = require('../models');
const ApiError = require('../utils/ApiError');
const { postMessage } = require('../messages');
const SearchFeature = require('../utils/SearchFeature');
const cacheService = require('../services/cache.service');
const generateUniqueSlug = require('../utils/generateUniqueSlug');

const getPostsByuserId = async (userId) => {
  const posts = await Post.find({ userId });
  return posts;
};
const getPostByTitle = async (title) => {
  const post = await Post.findOne({ title });
  return post;
};
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
  const postsCache = cacheService.get(`${filter}:${page}:${pageSize}:${sortBy}:post`);
  if (postsCache) return postsCache;

  let where = {};
  if (filter) {
    where.desc = { $regex: filter, $options: 'i' };
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

  cacheService.set(`${filter}:${page}:${pageSize}:${sortBy}:post`, { posts, total, page, pageSize, pages });

  return { posts, total, page, pageSize, pages };
};

const updatePostById = async (postId, updateBody) => {
  const post = await getPostById(postId);
  post.slug = await generateUniqueSlug(updateBody.title, Post);
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
