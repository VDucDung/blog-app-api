const express = require('express');
const { baseController } = require('../controllers');
const authApiKey = require('../middlewares/auth-api-key.middleware');

const baseRouter = express.Router();

baseRouter.get('/', baseController.getHome);

baseRouter.get('/locales/:lang', baseController.changeLanguage);

baseRouter.get('/logs', authApiKey('cronJob'), baseController.sendLogs);

baseRouter.all('*', baseController.handlerNotFound);

module.exports = baseRouter;
