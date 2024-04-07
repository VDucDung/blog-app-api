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

module.exports = {
  login,
  register,
};
