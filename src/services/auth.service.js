const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const { env } = require('../config');
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');
const { userMessage, authMessage } = require('../messages');

const login = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, authMessage().INVALID_LOGIN);
  }

  if (user.isLocked) {
    throw new ApiError(httpStatus.UNAUTHORIZED, userMessage().USER_LOCKED);
  }

  const payload = { id: user.id, email, role: user.role };

  user.lastActive = Date.now();
  await user.save();
  user.password = undefined;

  const accessToken = generateToken('access', payload);
  const refreshToken = generateToken('refresh', payload);

  return { user, accessToken, refreshToken };
};

const register = async (username, email, password) => {
  const registerData = {
    username,
    email,
    password,
  };

  const user = await userService.createUser(registerData);

  const accessToken = generateToken('access', { id: user.id, email, role: user.role });
  const refreshToken = generateToken('refresh', { id: user.id });

  return { user, accessToken, refreshToken };
};

const refreshToken = async (refreshToken) => {
  const payload = jwt.verify(refreshToken, env.jwt.secretRefresh);

  if (!payload || payload.type !== 'refresh') {
    throw new ApiError(httpStatus.BAD_REQUEST, authMessage().INVALID_TOKEN);
  }

  const user = await userService.getUserByEmail(payload.email);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, authMessage().INVALID_TOKEN);
  }

  if (user.isLocked) {
    throw new ApiError(httpStatus.UNAUTHORIZED, userMessage().USER_LOCKED);
  }

  data = { id: user.id, email: user.email };
  const accessToken = generateToken('access', data);

  return { accessToken };
};

const generateToken = (type, payload) => {
  const secret = type === 'access' ? env.jwt.secretAccess : env.jwt.secretRefresh;

  const expiresIn = type === 'access' ? env.jwt.expiresAccessToken : env.jwt.expiresRefreshToken;

  const token = jwt.sign({ ...payload, type }, secret, {
    expiresIn,
  });

  return token;
};

const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await userService.getUserById(userId);

  if (!(await user.isPasswordMatch(oldPassword))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, authMessage().INVALID_PASSWORD);
  }

  user.password = newPassword;
  await user.save();
  user.password = undefined;

  return user;
};

module.exports = {
  login,
  register,
  refreshToken,
  changePassword,
};
