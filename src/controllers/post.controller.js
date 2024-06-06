const httpStatus = require('http-status');

const response = require('../utils/response');
const { postService } = require('../services');
const { postMessage } = require('../messages');
const catchAsync = require('../utils/catchAsync');
const { REQUEST_USER_KEY } = require('../constants');

const createPost = catchAsync(async (req, res) => {
  req.body.userId = req[REQUEST_USER_KEY].id;
  if (req.file) req.body['image'] = req.file.path;
  if (req.body.body) req.body['body'] = JSON.parse(req.body.body);
  if (req.body.tags) req.body['tags'] = JSON.parse(req.body.tags);
  if (req.body.categories) req.body['categories'] = JSON.parse(req.body.categories);

  const post = await postService.createPost(req.body);

  res.status(httpStatus.CREATED).json(response(httpStatus.CREATED, postMessage().CREATE_SUCCESS, post));
});

const getPosts = catchAsync(async (req, res) => {
  const posts = await postService.getPostsByKeyword(req.query);
  res.status(httpStatus.OK).json(response(httpStatus.OK, postMessage().FIND_LIST_SUCCESS, posts));
});

const getAllPosts = catchAsync(async (req, res) => {
  const filter = req.query.keyword || '';
  const sortBy = req.query.sortBy || 'desc';
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 10;
  const checkCache = req.query.checkCache;

  const { posts, total, pages } = await postService.getAllPosts(filter, page, pageSize, sortBy, checkCache);

  res.header({
    'Access-Control-Expose-Headers': 'x-filter, x-totalcount, x-currentpage, x-pagesize, x-totalpagecount',
    'x-filter': filter,
    'x-totalcount': JSON.stringify(total),
    'x-currentpage': JSON.stringify(page),
    'x-pagesize': JSON.stringify(pageSize),
    'x-totalpagecount': JSON.stringify(pages),
  });

  if (page > pages) {
    return res.status(httpStatus.NOT_FOUND).json(response(httpStatus.NOT_FOUND, postMessage().NOT_FOUND));
  }

  res.status(httpStatus.OK).json(response(httpStatus.OK, postMessage().FIND_LIST_SUCCESS, posts));
});

const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostBySlug(req.params.slug);

  if (!post) {
    res.status(httpStatus.NOT_FOUND).json(response(httpStatus.NOT_FOUND, postMessage().NOT_FOUND));
  }

  res.status(httpStatus.OK).json(response(httpStatus.OK, postMessage().FIND_SUCCESS, post));
});

const updatePost = catchAsync(async (req, res) => {
  if (req.file) req.body['image'] = req.file.path;
  if (req.body.body) req.body['body'] = JSON.parse(req.body.body);
  if (req.body.tags) req.body['tags'] = JSON.parse(req.body.tags);
  if (req.body.categories) req.body['categories'] = JSON.parse(req.body.categories);
  const post = await postService.updatePostById(req.params.postId, req.body);

  res.status(httpStatus.OK).json(response(httpStatus.OK, postMessage().UPDATE_SUCCESS, post));
});

const deletePost = catchAsync(async (req, res) => {
  const post = await postService.deletePostById(req.params.postId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, postMessage().DELETE_SUCCESS, post));
});

module.exports = {
  createPost,
  getPosts,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
};
