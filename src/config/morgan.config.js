const morgan = require('morgan');
const logger = require('./logger.config');
const getInfoClient = require('../utils/getInfoClient');

morgan.token('ip', (req, res) => getInfoClient(req).userIP || '');
morgan.token('message', (req, res) => res.locals.errorMessage || '');

const successResponseFormat = `:ip :method :url :status - :response-time ms`;
const errorResponseFormat = `:ip :method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => {
    return res.statusCode >= 400 || req.originalUrl.startsWith('/static');
  },
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
  successHandler,
  errorHandler,
};
