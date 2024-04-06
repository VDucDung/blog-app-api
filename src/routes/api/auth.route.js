const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const { authController } = require('../../controllers');
const { authValidation } = require('../../validations');
const authRouter = express.Router();

authRouter.route('/login').post(validate(authValidation.login), authController.login);

module.exports = authRouter;
