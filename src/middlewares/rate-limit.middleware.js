const httpStatus = require('http-status');
const rateLimit = require('express-rate-limit');

const { systemMessage } = require('../messages');

/**
 * Middleware function to apply rate limiting.
 * @param {number} [timeLimit=3] - Time limit in minutes.
 * @param {number} [numberRequest=100] - Number of requests allowed within time limit.
 * @returns {Function} - Express middleware function.
 */
const limiter = (timeLimit = 3, numberRequest = 100) =>
  rateLimit({
    windowMs: timeLimit * 60 * 1000,
    limit: numberRequest,
    legacyHeaders: false,
    standardHeaders: true,
    message: {
      code: httpStatus.TOO_MANY_REQUESTS,
      message: systemMessage().MANY_REQUESTS,
    },
  });

module.exports = limiter;
