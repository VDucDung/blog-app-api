const { Category } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { categoryMessage } = require('../messages');
const SearchFeature = require('../utils/SearchFeature');

const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, categoryMessage().NOT_FOUND);
  }
  return category;
};

const createCategory = async (categoryBody) => {
  const category = await Category.create(categoryBody);
  return category;
};

const getCategoriesByKeyword = async (requestQuery) => {
  const searchFeatures = new SearchFeature(Category);
  const { results, ...detailResult } = await searchFeatures.getResults(requestQuery, ['name']);
  return { categories: results, ...detailResult };
};

const updateCategoryById = async (categoryId, updateBody) => {
  const category = await getCategoryById(categoryId);
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  await category.deleteOne();
  return category;
};

module.exports = {
  getCategoryById,
  createCategory,
  getCategoriesByKeyword,
  updateCategoryById,
  deleteCategoryById,
};
