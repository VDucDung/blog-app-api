const httpStatus = require('http-status');

const { env } = require('../config');
const response = require('../utils/response');
const { authMessage } = require('../messages');
const catchAsync = require('../utils/catchAsync');
const { REQUEST_USER_KEY, URL_HOST } = require('../constants');
const { authService, userService, cryptoService } = require('../services');

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } = await authService.login(email, password);

  res
    .status(httpStatus.OK)
    .json(response(httpStatus.OK, authMessage().LOGIN_SUCCESS, { user, accessToken, refreshToken }));
});

const register = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;

  await authService.register(username, email, password);

  res.status(httpStatus.CREATED).json(response(httpStatus.CREATED, authMessage().REGISTER_SUCCESS));
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  const { accessToken } = await authService.refreshToken(refreshToken);

  res.status(httpStatus.OK).json(response(httpStatus.OK, authMessage().REFRESH_TOKEN_SUCCESS, { accessToken }));
});

const getMe = catchAsync(async (req, res) => {
  const user = req[REQUEST_USER_KEY];

  res.status(httpStatus.OK).json(response(httpStatus.OK, authMessage().GET_ME_SUCCESS, user));
});

const updateMe = catchAsync(async (req, res) => {
  if (req.file) req.body['avatar'] = req.file.path;

  const userId = req[REQUEST_USER_KEY].id;

  const user = await userService.updateUserById(userId, req.body);

  res.status(httpStatus.OK).json(response(httpStatus.OK, authMessage().UPDATE_ME_SUCCESS, user));
});

const changePassword = catchAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const userId = req[REQUEST_USER_KEY].id;

  const user = await authService.changePassword(userId, oldPassword, newPassword);

  res.status(httpStatus.OK).json(response(httpStatus.OK, authMessage().CHANGE_PASSWORD_SUCCESS, user));
});

const verifyEmail = catchAsync(async (req, res) => {
  const { token } = req.query;

  const originalToken = token.replaceAll(' ', '+');

  await authService.verifyEmail(originalToken);

  res.status(httpStatus.OK).json(response(httpStatus.OK, authMessage().VERIFY_EMAIL_SUCCESS));
});

const renderPageVerifyEmail = catchAsync(async (req, res) => {
  const { token } = req.query;
  let payload, isExpired;

  try {
    const originalToken = token.replaceAll(' ', '+');
    ({ payload, isExpired } = cryptoService.expiresCheck(originalToken, env.secret.tokenVerify));
  } catch {
    return res.redirect(`${URL_HOST.production}/not-found`);
  }

  const user = await userService.getUserByEmail(payload.email);

  if (user?.isVerify) {
    return res.redirect(`${URL_HOST.production}/auth/login`);
  }

  if (isExpired) {
    return res.render('pages/resend-verify-email');
  }

  res.render('pages/verify-email');
});

const reSendEmailVerify = catchAsync(async (req, res) => {
  const { token } = req.query;

  const originalToken = token.replaceAll(' ', '+');

  await authService.reSendEmailVerify(originalToken);

  res.status(httpStatus.OK).json(response(httpStatus.OK, authMessage().RESEND_EMAIL_SUCCESS));
});

module.exports = {
  getMe,
  login,
  register,
  refreshToken,
  updateMe,
  changePassword,
  verifyEmail,
  renderPageVerifyEmail,
  reSendEmailVerify,
};
