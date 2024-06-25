const express = require('express');
const { categoryController } = require('../../controllers');
const { categoryValidation } = require('../../validations');
const validate = require('../../middlewares/validate.middleware');
const { auth, authorize } = require('../../middlewares/auth.middleware');
const { logAuthenticatedRequest } = require('../../middlewares/logger.middleware');
const categoryRouter = express.Router();

categoryRouter
  .route('/')
  .get(auth, logAuthenticatedRequest, validate(categoryValidation.getCategories), categoryController.getCategories)
  .post(auth, logAuthenticatedRequest, validate(categoryValidation.createCategory), categoryController.createCategory);

categoryRouter
  .route('/:categoryId')
  .get(auth, authorize('admin'), validate(categoryValidation.getCategory), categoryController.getCategory)
  .put(auth, authorize('admin'), validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .delete(auth, authorize('admin'), validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

module.exports = categoryRouter;
