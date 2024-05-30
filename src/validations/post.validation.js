const Joi = require('joi');

const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    caption: Joi.string().required(),
    body: Joi.string().required(),
    image: Joi.string(),
    userId: Joi.string().custom(objectId),
    tags: Joi.string(),
    categories: Joi.string(),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    keyword: Joi.string().allow(null, ''),
    sortBy: Joi.string().allow(null, ''),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    lang: Joi.string(),
    title: Joi.string().allow(null, ''),
    caption: Joi.string().allow(null, ''),
    body: Joi.object().allow(null, ''),
    image: Joi.string().allow(null, ''),
    userId: Joi.string().optional().custom(objectId),
    tags: Joi.array().allow(null, ''),
    categories: Joi.array().allow(null, ''),
  }),
};

const getPostBySlug = {
  params: Joi.object().keys({
    slug: Joi.string(),
  }),
};

const getPost = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    caption: Joi.string(),
    image: Joi.string().allow(null, ''),
    body: Joi.string().allow(null, ''),
    userId: Joi.string().optional().custom(objectId),
    tags: Joi.array().allow(null, ''),
    categories: Joi.array().allow(null, ''),
  }),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  getPostBySlug,
  updatePost,
  deletePost,
};
