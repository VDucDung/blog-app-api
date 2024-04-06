const { i18nService } = require('../config');

const postMessage = () => {
  return {
    NOT_FOUND: i18nService.translate('comment', 'notFound'),
    FIND_SUCCESS: i18nService.translate('comment', 'findSuccess'),
    FIND_LIST_SUCCESS: i18nService.translate('comment', 'findListSuccess'),
    CREATE_SUCCESS: i18nService.translate('comment', 'createSuccess'),
    UPDATE_SUCCESS: i18nService.translate('comment', 'updateSuccess'),
    DELETE_SUCCESS: i18nService.translate('comment', 'deleteSuccess'),
    ALREADY_EXISTS: i18nService.translate('comment', 'alreadyExists'),
  };
};

module.exports = postMessage;
