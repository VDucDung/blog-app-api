const express = require('express');
const { authController } = require('../../controllers');
const { authValidation } = require('../../validations');
const validate = require('../../middlewares/validate.middleware');
const { auth } = require('../../middlewares/auth.middleware');
const authRouter = express.Router();

authRouter.route('/login').post(validate(authValidation.login), authController.login);
authRouter.route('/register').post(validate(authValidation.register), authController.register);
authRouter.route('/refresh-token').post(auth, validate(authValidation.refreshToken), authController.refreshToken);
module.exports = authRouter;
