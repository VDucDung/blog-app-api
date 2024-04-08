const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createComment = {
  body: Joi.object().keys({
    comment: Joi.string().required(),
    postId: Joi.string().custom(objectId),
    userId: Joi.string().custom(objectId),
  }),
};

const getComments = {
  query: Joi.object().keys({
    keyword: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    lang: Joi.string(),
    comment: Joi.string().allow(null, ''),
    postId: Joi.string().optional().custom(objectId),
    userId: Joi.string().optional().custom(objectId),
  }),
};

const getComment = {
  params: Joi.object().keys({
    commentId: Joi.string().custom(objectId),
  }),
};

const updateComment = {
  params: Joi.object().keys({
    commentId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      comment: Joi.string(),
      postId: Joi.string().optional().custom(objectId),
      userId: Joi.string().optional().custom(objectId),
    })
    .min(1),
};

const deleteComment = {
  params: Joi.object().keys({
    commentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
};
