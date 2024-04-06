const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { systemMessage } = require('../messages');

const getHome = (req, res) => {
  res.send('Server Blog App is running 🎉');
};

const changeLanguage = (req, res) => {
  res.cookie('lang', req.params.lang);
  res.redirect('/');
};

const handlerNotFound = (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, systemMessage().RESOURCE_NOT_FOUND));
};

module.exports = {
  getHome,
  changeLanguage,
  handlerNotFound,
};
