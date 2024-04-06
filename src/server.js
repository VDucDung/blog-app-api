const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { env, logger, i18nService } = require('./config');
const { errorConverter, errorHandler } = require('./middlewares/error.middleware');

const apiRoute = require('./routes/api');
const baseRouter = require('./routes/base.route');

const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
  next(i18nService.setLocale(req, res));
});

app.use('/api/v1', apiRoute);

app.use('/', baseRouter);

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
