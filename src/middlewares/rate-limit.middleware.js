const httpStatus = require('http-status');
const rateLimit = require('express-rate-limit');

const { env } = require('../config');
const { systemMessage } = require('../messages');

const createRateLimit = (windowMs, limit) =>
  rateLimit({
    windowMs: windowMs * 60 * 1000,
    limit: limit,
    legacyHeaders: false,
    standardHeaders: true,
    message: {
      code: httpStatus.TOO_MANY_REQUESTS,
      message: systemMessage().MANY_REQUESTS,
    },
  });

const rateLimitApp = createRateLimit(env.rateLimit.timeApp, env.rateLimit.totalApp);
const rateLimitAuth = createRateLimit(env.rateLimit.timeAuth, env.rateLimit.totalAuth);

module.exports = {
  rateLimitApp,
  rateLimitAuth,
};
