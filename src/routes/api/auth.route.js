const express = require('express');

const { env } = require('../../config');
const { uploadService } = require('../../services');
const { authController } = require('../../controllers');
const { authValidation } = require('../../validations');
const { auth } = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const limiter = require('../../middlewares/rate-limit.middleware');

const authRouter = express.Router();

authRouter
  .route('/me')
  .get(auth, authController.getMe)
  .put(auth, uploadService.uploadImage.single('avatar'), validate(authValidation.updateMe), authController.updateMe);

authRouter.get('/verify', authController.renderPageVerifyEmail);

authRouter.post('/verify', validate(authValidation.verifyEmail), authController.verifyEmail);

authRouter.post('/resend-email-verify', validate(authValidation.verifyEmail), authController.reSendEmailVerify);

authRouter.use(limiter(env.rateLimit.timeAuth, env.rateLimit.totalAuth));

authRouter.route('/login').post(validate(authValidation.login), authController.login);

authRouter.route('/register').post(validate(authValidation.register), authController.register);

authRouter.route('/refresh-tokens').post(validate(authValidation.refreshToken), authController.refreshToken);

authRouter.route('/change-password').post(auth, validate(authValidation.changePassword), authController.changePassword);

authRouter.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);

authRouter.post(
  '/verify-otp-forgot-password',
  validate(authValidation.verifyOTPForgotPassword),
  authController.verifyOTPForgotPassword,
);

authRouter.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);

module.exports = authRouter;
