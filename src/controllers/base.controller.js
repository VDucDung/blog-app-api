const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { systemMessage } = require('../messages');
const readFileLog = require('../utils/readFileLog');
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

const sendLogs = (req, res) => {
  const logs = readFileLog();
  res.send({ code: httpStatus.OK, data: { logs } });
};

module.exports = {
  getHome,
  sendLogs,
  changeLanguage,
  handlerNotFound,
};
