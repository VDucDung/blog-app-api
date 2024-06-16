const { QUEUE_TYPES } = require('../constants');
const rabbitService = require('./rabbitmq.service');

const sendEmail = async (options) => {
  await rabbitService.sendQueue(QUEUE_TYPES.EMAIL_QUEUE, options);
};

module.exports = {
  sendEmail,
};
