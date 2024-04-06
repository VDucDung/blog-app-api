const Joi = require('joi');
const { password, email } = require('./custom.validation');

const login = {
  body: Joi.object().keys({
    email: Joi.string().custom(email),
    password: Joi.string().custom(password),
  }),
};

module.exports = {
  login,
};
