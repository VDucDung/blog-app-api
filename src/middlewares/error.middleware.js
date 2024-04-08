const mongoose = require('mongoose');
const httpStatus = require('http-status');

const { env, logger } = require('../config');
const ApiError = require('../utils/ApiError');
const { systemMessage, authMessage } = require('../messages');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }

  if (error.message === 'jwt expired') {
    error = new ApiError(httpStatus.UNAUTHORIZED, authMessage().TOKEN_EXPIRED);
  }

  if (error.message === 'File too large') {
    error = new ApiError(httpStatus.BAD_REQUEST, systemMessage().IMAGE_MAX_SIZE);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (env.nodeEnv === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(env.nodeEnv === 'development' && { stack: err.stack }),
  };

  if (env.nodeEnv === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
