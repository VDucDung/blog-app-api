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

const getAllPosts = catchAsync(async (req, res) => {
  const { searchKeyword, page, limit } = req.query;
  const requestQuery = { searchKeyword, page, limit };

  const { posts, total, pages, pageSize, currentPage } = await postService.getAllPosts(requestQuery);

  res.header({
    'x-filter': searchKeyword,
    'x-totalcount': JSON.stringify(total),
    'x-currentpage': JSON.stringify(currentPage),
    'x-pagesize': JSON.stringify(pageSize),
    'x-totalpagecount': JSON.stringify(pages),
  });

  if (currentPage > pages) {
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
