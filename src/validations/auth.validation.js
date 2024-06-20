const Joi = require('joi');
const { password, email, username } = require('./custom.validation');

const login = {
  body: Joi.object().keys({
    email: Joi.string().custom(email),
    password: Joi.string().custom(password),
  }),
};

const register = {
  body: Joi.object().keys({
    email: Joi.string().custom(email),
    password: Joi.string().custom(password),
    username: Joi.string().custom(username),
  }),
};
const refreshToken = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required(password),
    newPassword: Joi.string().required(password),
  }),
};

const updateMe = {
  body: Joi.object().keys({
    username: Joi.string().optional().custom(username),
    dateOfBirth: Joi.date().allow(null, '').less('now'),
    gender: Joi.string().allow('male', 'female', ''),
    avatar: Joi.string(),
    address: Joi.string().allow(null, ''),
    phone: Joi.string().allow(null, ''),
    description: Joi.string().allow(null, ''),
    background: Joi.string().allow(null, ''),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required().max(255),
  }),
};

const reSendEmailVerify = async (token) => {
  const expires = Date.now() + EXPIRES_TOKEN_EMAIL_VERIFY;

  const { isExpired, payload } = cryptoService.expiresCheck(token, env.secret.tokenVerify, TIME_DIFF_EMAIL_VERIFY);

  if (!isExpired) {
    throw new ApiError(httpStatus.BAD_REQUEST, authMessage().PLEASE_WAIT);
  }

  const user = await userService.getUserByEmail(payload.email);
  if (user.isVerify) {
    throw new ApiError(httpStatus.BAD_REQUEST, authMessage().INVALID_TOKEN);
  }

  const tokenVerify = cryptoService.encryptObj(
    {
      expires,
      email: user.email,
      type: TOKEN_TYPES.VERIFY,
    },
    env.secret.tokenVerify,
  );

  const linkVerify = `${URL_HOST[env.nodeEnv]}/v1/auth/verify?token=${tokenVerify}`;
  await emailService.sendEmail({
    emailData: {
      emails: user.email,
      subject: EMAIL_SUBJECT.VERIFY,
      linkVerify,
    },
    type: EMAIL_TYPES.VERIFY,
  });

  user.verifyExpireAt = expires;
  await user.save();
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().required().custom(email),
  }),
};

const verifyOTPForgotPassword = {
  body: Joi.object().keys({
    tokenForgot: Joi.string().required(),
    otp: Joi.string().required(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    tokenVerifyOTP: Joi.string().required(),
    newPassword: Joi.string().custom(password),
  }),
};

module.exports = {
  login,
  register,
  refreshToken,
  changePassword,
  updateMe,
  verifyEmail,
  reSendEmailVerify,
  forgotPassword,
  verifyOTPForgotPassword,
  resetPassword,
};
