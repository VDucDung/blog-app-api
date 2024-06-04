const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createComment = {
  body: Joi.object().keys({
    comment: Joi.string().required(),
    slug: Joi.string().required(),
    parent: Joi.string().custom(objectId).allow(null),
    replyOnUser: Joi.string().custom(objectId).allow(null),
  }),
};

const getComments = {
  query: Joi.object().keys({
    keyword: Joi.string().allow(null, ''),
    sortBy: Joi.string().allow(null, ''),
    limit: Joi.number().integer().allow(null, ''),
    page: Joi.number().integer().allow(null, ''),
    lang: Joi.string(),
    comment: Joi.string().allow(null, ''),
    postId: Joi.string().optional().custom(objectId),
    userId: Joi.string().optional().custom(objectId),
    parent: Joi.string().optional().custom(objectId),
    replyOnUser: Joi.string().optional().custom(objectId),
    check: Joi.boolean().optional(),
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
