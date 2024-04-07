const httpStatus = require('http-status');

const response = require('../utils/response');
const { categoryService } = require('../services');
const { categoryMessage } = require('../messages');
const catchAsync = require('../utils/catchAsync');

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).json(response(httpStatus.CREATED, categoryMessage().CREATE_SUCCESS, category));
});

const getCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getCategoriesByKeyword(req.query);
  res.status(httpStatus.OK).json(response(httpStatus.OK, categoryMessage().FIND_LIST_SUCCESS, categories));
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId || req.body.category.id);
  res.status(httpStatus.OK).json(response(httpStatus.OK, categoryMessage().FIND_SUCCESS, category));
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(req.params.categoryId, req.body);
  res.status(httpStatus.OK).json(response(httpStatus.OK, categoryMessage().UPDATE_SUCCESS, category));
});

const deleteCategory = catchAsync(async (req, res) => {
  const category = await categoryService.deleteCategoryById(req.params.categoryId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, categoryMessage().DELETE_SUCCESS, category));
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
