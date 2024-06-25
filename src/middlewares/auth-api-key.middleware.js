const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const { authMessage } = require('../messages');
const apiKeyMappings = require('../constants/api-key.constant');

const authApiKey = (typeApiKey) => (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    throw new ApiError(httpStatus.UNAUTHORIZED, authMessage().UNAUTHORIZED);
  }

  const listApiAllow = apiKeyMappings[typeApiKey];

  if (!listApiAllow.includes(apiKey)) {
    throw new ApiError(httpStatus.FORBIDDEN, authMessage().FORBIDDEN);
  }

  next();
};

module.exports = authApiKey;
