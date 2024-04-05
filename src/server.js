const express = require('express');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { env, logger } = require('./config');
const ApiError = require('./utils/ApiError');
const { errorConverter, errorHandler } = require('./middlewares/error.middleware');
const app = express();

app.get('/', (req, res) => {
  res.send('Server Blog App is running 🎉');
});

app.all('*', (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Resource not found.'));
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
