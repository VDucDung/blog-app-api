const Joi = require('joi');
const { password, email, username } = require('./custom.validation');

const login = {
  body: Joi.object().keys({
    email: Joi.string().custom(email),
    password: Joi.string().custom(password),
  }),
};

const register = {
  body: Joi.object().keys({
    email: Joi.string().custom(email),
    password: Joi.string().custom(password),
    username: Joi.string().custom(username),
  }),
};
const refreshToken = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required(password),
    newPassword: Joi.string().required(password),
  }),
};

const updateMe = {
  body: Joi.object().keys({
    username: Joi.string().optional().custom(username),
    dateOfBirth: Joi.date().allow(null, '').less('now'),
    gender: Joi.string().allow('male', 'female', ''),
    avatar: Joi.string(),
    address: Joi.string().allow(null, ''),
    phone: Joi.string().allow(null, ''),
    description: Joi.string().allow(null, ''),
    background: Joi.string().allow(null, ''),
  }),
};

module.exports = {
  login,
  register,
  refreshToken,
  changePassword,
  updateMe,
};
