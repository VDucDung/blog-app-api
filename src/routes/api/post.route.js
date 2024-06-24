const express = require('express');

const { uploadService } = require('../../services');
const { postController } = require('../../controllers');
const { postValidation } = require('../../validations');
const validate = require('../../middlewares/validate.middleware');
const { auth, authorize } = require('../../middlewares/auth.middleware');

const postRouter = express.Router();

postRouter
  .route('/')
  .get(validate(postValidation.getPosts), postController.getAllPosts)
  .post(
    auth,
    uploadService.uploadImage.single('image'),
    validate(postValidation.createPost),
    postController.createPost,
  );

postRouter.route('/:slug').get(validate(postValidation.getPostBySlug), postController.getPost);

postRouter
  .route('/post/:postId')
  .get(validate(postValidation.getPost), postController.getPost)
  .put(
    auth,
    authorize(['admin', 'user']),
    uploadService.uploadImage.single('image'),
    validate(postValidation.updatePost),
    postController.updatePost,
  )
  .delete(auth, authorize(['admin', 'user']), validate(postValidation.deletePost), postController.deletePost);

module.exports = postRouter;
