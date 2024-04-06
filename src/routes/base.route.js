const express = require('express');
const { baseController } = require('../controllers');

const baseRouter = express.Router();

baseRouter.get('/', baseController.getHome);

baseRouter.get('/locales/:lang', baseController.changeLanguage);

baseRouter.all('*', baseController.handlerNotFound);

module.exports = baseRouter;
