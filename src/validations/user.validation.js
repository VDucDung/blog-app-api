const Joi = require('joi');
const { password, objectId, email, role } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().custom(email),
    password: Joi.string().custom(password),
    role: Joi.string().custom(role),
    isLocked: Joi.boolean().valid(true, false),
    isVerify: Joi.boolean().valid(true, false),
    phone: Joi.string().allow(null, ''),
    dateOfBirth: Joi.date().allow(null, ''),
    avatar: Joi.string().allow(null, ''),
    gender: Joi.string().allow('male', 'female', ''),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    keyword: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    lang: Joi.string(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      username: Joi.string(),
      email: Joi.string().custom(email),
      password: Joi.string().custom(password),
      role: Joi.string().custom(role),
      isLocked: Joi.boolean().valid(true, false),
      isVerify: Joi.boolean().valid(true, false),
      phone: Joi.string().allow(null, ''),
      dateOfBirth: Joi.date().allow(null, ''),
      avatar: Joi.string().allow(null, ''),
      gender: Joi.string().allow('male', 'female', ''),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const lockUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  lockUser,
};
