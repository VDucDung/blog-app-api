const { i18nService } = require('../config');

const postMessage = () => {
  return {
    NOT_FOUND: i18nService.translate('post', 'notFound'),
    FIND_SUCCESS: i18nService.translate('post', 'findSuccess'),
    FIND_LIST_SUCCESS: i18nService.translate('post', 'findListSuccess'),
    CREATE_SUCCESS: i18nService.translate('post', 'createSuccess'),
    UPDATE_SUCCESS: i18nService.translate('post', 'updateSuccess'),
    DELETE_SUCCESS: i18nService.translate('post', 'deleteSuccess'),
    ALREADY_EXISTS: i18nService.translate('post', 'alreadyExists'),
    FORBIDDEN: i18nService.translate('post', 'forbidden'),
  };
};

module.exports = postMessage;
