const express = require('express');

const { uploadService } = require('../../services');
const { authController } = require('../../controllers');
const { authValidation } = require('../../validations');
const { auth } = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const { rateLimitAuth } = require('../../middlewares/rate-limit.middleware');

const authRouter = express.Router();

authRouter
  .route('/me')
  .get(auth, authController.getMe)
  .put(auth, uploadService.uploadImage.single('avatar'), validate(authValidation.updateMe), authController.updateMe);

authRouter.use(rateLimitAuth);

authRouter.route('/login').post(validate(authValidation.login), authController.login);

authRouter.route('/register').post(validate(authValidation.register), authController.register);

authRouter.route('/refresh-tokens').post(validate(authValidation.refreshToken), authController.refreshToken);

authRouter.route('/change-password').post(auth, validate(authValidation.changePassword), authController.changePassword);

module.exports = authRouter;
