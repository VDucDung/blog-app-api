const { i18nService } = require('../config');

const userMessage = () => {
  return {
    NOT_FOUND: i18nService.translate('user', 'notFound'),
    EXISTS_EMAIL: i18nService.translate('user', 'existsEmail'),
    FIND_SUCCESS: i18nService.translate('user', 'findSuccess'),
    FIND_LIST_SUCCESS: i18nService.translate('user', 'findListSuccess'),
    CREATE_SUCCESS: i18nService.translate('user', 'createSuccess'),
    UPDATE_SUCCESS: i18nService.translate('user', 'updateSuccess'),
    DELETE_SUCCESS: i18nService.translate('user', 'deleteSuccess'),
    INCORRECT_ID: i18nService.translate('user', 'incorrectId'),
    PASSWORD_LENGTH: i18nService.translate('user', 'passwordLength'),
    PASSWORD_INVALID: i18nService.translate('user', 'passwordInvalid'),
    EMAIL_INVALID: i18nService.translate('user', 'emailInvalid'),
    ROLE_INVALID: i18nService.translate('user', 'roleInvalid'),
    LOCKED_SUCCESS: i18nService.translate('user', 'lockedSuccess'),
    UNLOCKED_SUCCESS: i18nService.translate('user', 'unlockedSuccess'),
    USER_LOCKED: i18nService.translate('user', 'userLocked'),
    PHONE_LENGTH: i18nService.translate('user', 'phoneLength'),
    USERNAME_LENGTH: i18nService.translate('user', 'usernameLength'),
  };
};

module.exports = userMessage;
