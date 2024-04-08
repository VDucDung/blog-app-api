const httpStatus = require('http-status');

const response = require('../utils/response');
const { postService } = require('../services');
const { postMessage } = require('../messages');
const catchAsync = require('../utils/catchAsync');
const { REQUEST_USER_KEY } = require('../constants');

const createPost = catchAsync(async (req, res) => {
  req.body.userId = req[REQUEST_USER_KEY].id;
  if (req.file) req.body['image'] = req.file.path;
  const post = await postService.createPost(req.body);
  res.status(httpStatus.CREATED).json(response(httpStatus.CREATED, postMessage().CREATE_SUCCESS, post));
});

const getPosts = catchAsync(async (req, res) => {
  const posts = await postService.getPostsByKeyword(req.query);
  res.status(httpStatus.OK).json(response(httpStatus.OK, postMessage().FIND_LIST_SUCCESS, posts));
});

const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId || req.body.post.id);
  res.status(httpStatus.OK).json(response(httpStatus.OK, postMessage().FIND_SUCCESS, post));
});

const updatePost = catchAsync(async (req, res) => {
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
  getPost,
  updatePost,
  deletePost,
};
