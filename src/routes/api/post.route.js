const express = require('express');

const { postController } = require('../../controllers');
const { postValidation } = require('../../validations');
const validate = require('../../middlewares/validate.middleware');
const { auth, authorize } = require('../../middlewares/auth.middleware');
const postRouter = express.Router();

postRouter
  .route('/')
  .get(validate(postValidation.getPosts), postController.getPosts)
  .post(auth, validate(postValidation.createPost), postController.createPost);

postRouter
  .route('/:postId')
  .get(auth, authorize('admin'), validate(postValidation.getPost), postController.getPost)
  .put(auth, authorize('admin'), validate(postValidation.updatePost), postController.updatePost)
  .delete(auth, authorize('admin'), validate(postValidation.deletePost), postController.deletePost);

module.exports = postRouter;
