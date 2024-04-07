const express = require('express');
const { commentController } = require('../../controllers');
const { commentValidation } = require('../../validations');
const validate = require('../../middlewares/validate.middleware');
const commentRouter = express.Router();

commentRouter
  .route('/')
  .get(validate(commentValidation.getComments), commentController.getComments)
  .post(validate(commentValidation.createComment), commentController.createComment);

commentRouter
  .route('/:commentId')
  .get(validate(commentValidation.getComment), commentController.getComment)
  .put(validate(commentValidation.updateComment), commentController.updateComment)
  .delete(validate(commentValidation.deleteComment), commentController.deleteComment);

module.exports = commentRouter;
