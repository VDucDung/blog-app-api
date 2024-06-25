const express = require('express');

const { commentController } = require('../../controllers');
const { commentValidation } = require('../../validations');
const validate = require('../../middlewares/validate.middleware');
const { auth, authorize } = require('../../middlewares/auth.middleware');
const { logAuthenticatedRequest } = require('../../middlewares/logger.middleware');

const commentRouter = express.Router();

commentRouter
  .route('/')
  .get(validate(commentValidation.getComments), commentController.getAllComments)
  .post(auth, logAuthenticatedRequest, validate(commentValidation.createComment), commentController.createComment);

commentRouter
  .route('/:commentId')
  .get(auth, authorize('admin'), validate(commentValidation.getComment), commentController.getComment)
  .put(auth, authorize('admin'), validate(commentValidation.updateComment), commentController.updateComment)
  .delete(auth, authorize('admin'), validate(commentValidation.deleteComment), commentController.deleteComment);

module.exports = commentRouter;
