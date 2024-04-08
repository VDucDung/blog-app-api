const express = require('express');
const { uploadService } = require('../../services');
const { userController } = require('../../controllers');
const { userValidation } = require('../../validations');
const validate = require('../../middlewares/validate.middleware');
const { auth, authorize } = require('../../middlewares/auth.middleware');
const userRouter = express.Router();

userRouter.use(auth);
userRouter.use(authorize('admin'));

userRouter
  .route('/')
  .get(validate(userValidation.getUsers), userController.getUsers)
  .post(uploadService.uploadImage.single('avatar'), validate(userValidation.createUser), userController.createUser);

userRouter
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.getUser)
  .put(uploadService.uploadImage.single('avatar'), validate(userValidation.updateUser), userController.updateUser)
  .delete(validate(userValidation.deleteUser), userController.deleteUser)
  .options(validate(userValidation.lockUser), userController.lockUser);

module.exports = userRouter;
