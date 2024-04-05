const { env } = require('../config');

const getInfoClient = (req) => {
  const userEmail = req.user ? req.user.email : 'Anonymous';

  let userIP = 'localhost';

  if (env.nodeEnv === 'production') {
    userIP =
      req.headers['cf-connecting-ip'] ||
      (req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(', ')[0] : '') ||
      '';
  }

  return { userEmail, userIP };
};

module.exports = getInfoClient;
