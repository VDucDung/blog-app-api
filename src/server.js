const express = require('express');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { env, logger, i18nService } = require('./config');
const ApiError = require('./utils/ApiError');
const { errorConverter, errorHandler } = require('./middlewares/error.middleware');
const { systemMessage } = require('./messages');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
  next(i18nService.setLocale(req, res));
});
app.get('/', (req, res) => {
  res.send('Server Blog App is running 🎉');
});

app.get('/locales/:lang', (req, res) => {
  res.cookie('lang', req.params.lang);
  res.redirect('/');
});

app.all('*', (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, systemMessage().RESOURCE_NOT_FOUND));
});

app.use(errorConverter);
app.use(errorHandler);

mongoose
  .connect(env.mongoURI)
  .then(() => logger.info('MongoDB Connected...'))
  .then(() =>
    app.listen(env.port, () => {
      logger.info(`Server running on port ${env.port}`);
    }),
  )
  .catch((err) => logger.error(err));
