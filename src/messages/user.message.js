const { i18nService } = require('../config');

const userMessage = () => {
  return {
    NOT_FOUND: i18nService.translate('user', 'notFound'),
    EXISTS_EMAIL: i18nService.translate('user', 'existsEmail'),
  };
};

module.exports = userMessage;
