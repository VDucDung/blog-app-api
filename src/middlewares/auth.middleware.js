const jwt = require('jsonwebtoken');
const { env } = require('../config');
const { User } = require('../models');
const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userMessage, authMessage } = require('../messages');

const auth = catchAsync(async (req, res, next) => {
  const token = extractToken(req);
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, authMessage().UNAUTHORIZED);
  }
  const decoded = jwt.verify(token, env.jwt.secretAccess);
  const user = await User.findByIdAndUpdate(decoded.id, {
    lastActive: Date.now(),
  });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, authMessage().UNAUTHORIZED);
  }
  if (user.isLocked) {
    throw new ApiError(httpStatus.UNAUTHORIZED, userMessage().USER_LOCKED);
  }
  req.user = user;
  next();
});

const extractToken = (req) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  return token;
};

module.exports = {
  auth,
};
