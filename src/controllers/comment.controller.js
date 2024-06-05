const httpStatus = require('http-status');

const response = require('../utils/response');
const { commentService } = require('../services');
const { commentMessage } = require('../messages');
const catchAsync = require('../utils/catchAsync');
const { REQUEST_USER_KEY } = require('../constants');

const createComment = catchAsync(async (req, res) => {
  req.body.userId = req[REQUEST_USER_KEY].id;
  const comment = await commentService.createComment(req.body);
  res.status(httpStatus.CREATED).json(response(httpStatus.CREATED, commentMessage().CREATE_SUCCESS, comment));
});

const getComments = catchAsync(async (req, res) => {
  const comments = await commentService.getCommentsByKeyword(req.query);
  res.status(httpStatus.OK).json(response(httpStatus.OK, commentMessage().FIND_LIST_SUCCESS, comments));
});

const getAllComments = catchAsync(async (req, res) => {
  const filter = req.query.keyword || '';
  const sortBy = req.query.sortBy || 'desc';
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 10;
  const checkCache = req.query.checkCache;

  const { comments, total, pages } = await commentService.getAllComments(filter, page, pageSize, sortBy, checkCache);

  res.header({
    'Access-Control-Expose-Headers': 'x-filter, x-totalcount, x-currentpage, x-pagesize, x-totalpagecount',
    'x-filter': filter,
    'x-totalcount': JSON.stringify(total),
    'x-currentpage': JSON.stringify(page),
    'x-pagesize': JSON.stringify(pageSize),
    'x-totalpagecount': JSON.stringify(pages),
  });

  if (page > pages) {
    return res.status(httpStatus.NOT_FOUND).json(response(httpStatus.NOT_FOUND, commentMessage().NOT_FOUND));
  }

  res.status(httpStatus.OK).json(response(httpStatus.OK, commentMessage().FIND_LIST_SUCCESS, comments));
});

const getComment = catchAsync(async (req, res) => {
  const comment = await commentService.getCommentById(req.params.commentId || req.body.comment.id);
  res.status(httpStatus.OK).json(response(httpStatus.OK, commentMessage().FIND_SUCCESS, comment));
});

const updateComment = catchAsync(async (req, res) => {
  const comment = await commentService.updateCommentById(req.params.commentId, req.body);
  res.status(httpStatus.OK).json(response(httpStatus.OK, commentMessage().UPDATE_SUCCESS, comment));
});

const deleteComment = catchAsync(async (req, res) => {
  const comment = await commentService.deleteCommentById(req.params.commentId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, commentMessage().DELETE_SUCCESS, comment));
});

module.exports = {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
  getAllComments,
};
