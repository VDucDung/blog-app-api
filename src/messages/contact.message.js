const { i18nService } = require('../config');

const contactMessage = () => {
  return {
    NOT_FOUND: i18nService.translate('contact', 'notFound'),
    FIND_SUCCESS: i18nService.translate('contact', 'findSuccess'),
    FIND_LIST_SUCCESS: i18nService.translate('contact', 'findListSuccess'),
    CREATE_SUCCESS: i18nService.translate('contact', 'createSuccess'),
    UPDATE_SUCCESS: i18nService.translate('contact', 'updateSuccess'),
    DELETE_SUCCESS: i18nService.translate('contact', 'deleteSuccess'),
    ALREADY_EXISTS: i18nService.translate('contact', 'alreadyExists'),
  };
};

module.exports = contactMessage;
