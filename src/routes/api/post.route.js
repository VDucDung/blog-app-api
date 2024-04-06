const express = require('express');
const { postController } = require('../../controllers');
const { postValidation } = require('../../validations');
const validate = require('../../middlewares/validate.middleware');
const postRouter = express.Router();

postRouter
  .route('/')
  .get(validate(postValidation.getPosts), postController.getPosts)
  .post(validate(postValidation.createPost), postController.createPost);

postRouter
  .route('/:postId')
  .get(validate(postValidation.getPost), postController.getPost)
  .put(validate(postValidation.updatePost), postController.updatePost)
  .delete(validate(postValidation.deletePost), postController.deletePost)

module.exports = postRouter;
