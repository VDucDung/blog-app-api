const Joi = require('joi');

const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    caption: Joi.string().required(),
    body: Joi.object()
      .keys({
        type: Joi.string(),
        content: Joi.array(),
      })
      .required(),
    image: Joi.string(),
    userId: Joi.string().custom(objectId),
    tags: Joi.array(),
    categories: Joi.array(),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    keyword: Joi.string(),
    sortBy: Joi.string(),
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
  body: Joi.object()
    .keys({
      title: Joi.string(),
      caption: Joi.string(),
      image: Joi.string().allow(null, ''),
      body: Joi.object().allow(null, ''),
      userId: Joi.string().optional().custom(objectId),
      tags: Joi.array().allow(null, ''),
      categories: Joi.array().allow(null, ''),
    })
    .min(1),
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
