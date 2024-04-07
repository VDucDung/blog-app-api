const express = require('express');
const { userController } = require('../../controllers');
const { userValidation } = require('../../validations');
const validate = require('../../middlewares/validate.middleware');
const { auth, authorize } = require('../../middlewares/auth.middleware');
const userRouter = express.Router();

userRouter
  .route('/')
  .get(validate(userValidation.getUsers), userController.getUsers)
  .post(auth, validate(userValidation.createUser), userController.createUser);

userRouter
  .route('/:userId')
  .get(auth, authorize('admin'), validate(userValidation.getUser), userController.getUser)
  .put(auth, authorize('admin'), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth, authorize('admin'), validate(userValidation.deleteUser), userController.deleteUser)
  .options(auth, authorize('admin'), validate(userValidation.lockUser), userController.lockUser);

module.exports = userRouter;
