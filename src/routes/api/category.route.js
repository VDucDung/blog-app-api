const express = require('express');
const { categoryController } = require('../../controllers');
const { categoryValidation } = require('../../validations');
const validate = require('../../middlewares/validate.middleware');
const categoryRouter = express.Router();

categoryRouter
  .route('/')
  .get(validate(categoryValidation.getCategories), categoryController.getCategories)
  .post(validate(categoryValidation.createCategory), categoryController.createCategory);

categoryRouter
  .route('/:categoryId')
  .get(validate(categoryValidation.getCategory), categoryController.getCategory)
  .put(validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .delete(validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

module.exports = categoryRouter;
