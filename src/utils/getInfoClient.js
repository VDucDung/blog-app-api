const { env } = require('../config');
const { REQUEST_USER_KEY } = require('../constants');

const getInfoClient = (req) => {
  const userEmail = req[REQUEST_USER_KEY] ? req[REQUEST_USER_KEY].email : 'Anonymous';

  let userIP = 'localhost';

  if (env.NODE_ENV === 'production') {
    userIP =
      req.headers['cf-connecting-ip'] ||
      (req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(', ')[0] : '') ||
      '';
  }

  return { userEmail, userIP };
};

module.exports = getInfoClient;
