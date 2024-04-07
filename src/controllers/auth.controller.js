const httpStatus = require('http-status');
const response = require('../utils/response');
const catchAsync = require('../utils/catchAsync');
const { authService } = require('../services');
const { authMessage } = require('../messages');

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.login(email, password);
  res
    .status(httpStatus.OK)
    .json(response(httpStatus.OK, authMessage().LOGIN_SUCCESS, { user, accessToken, refreshToken }));
});

const register = catchAsync(async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.register(username, email, password);
  res
    .status(httpStatus.CREATED)
    .json(response(httpStatus.CREATED, authMessage().REGISTER_SUCCESS, { user, accessToken, refreshToken }));
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  const { accessToken } = await authService.refreshToken(refreshToken);
  res.status(httpStatus.OK).json(response(httpStatus.OK, authMessage().REFRESH_TOKEN_SUCCESS, { accessToken }));
});
module.exports = {
  login,
  register,
  refreshToken,
};
