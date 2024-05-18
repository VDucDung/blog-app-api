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
};
