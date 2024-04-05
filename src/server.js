const express = require('express');
const { env } = require('./config');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
  res.send('Server Blog App is running 🎉');
});

mongoose
  .connect(env.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .then(() =>
    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    }),
  )
  .catch((err) => console.log(err));
