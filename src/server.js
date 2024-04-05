const express = require('express');
const { env, logger } = require('./config');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
  res.send('Server Blog App is running 🎉');
});

mongoose
  .connect(env.mongoURI)
  .then(() => logger.info('MongoDB Connected...'))
  .then(() =>
    app.listen(env.port, () => {
      logger.info(`Server running on port ${env.port}`);
    }),
  )
  .catch((err) => logger.error(err));
