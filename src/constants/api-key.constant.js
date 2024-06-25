const { env } = require('../config');

const apiKeyMappings = {
  mailer: env.apiKey.mailer.trim().split(','),
  cronJob: env.apiKey.cronJob.trim().split(','),
};

module.exports = apiKeyMappings;
