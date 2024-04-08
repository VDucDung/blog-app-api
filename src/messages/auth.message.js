const { i18nService } = require('../config');

const authMessage = () => {
  return {
    INVALID_LOGIN: i18nService.translate('auth', 'invalidLogin'),
    LOGIN_SUCCESS: i18nService.translate('auth', 'loginSuccess'),
    REGISTER_SUCCESS: i18nService.translate('auth', 'registerSuccess'),
    REFRESH_TOKEN_SUCCESS: i18nService.translate('auth', 'refreshTokenSuccess'),
    INVALID_TOKEN: i18nService.translate('auth', 'invalidToken'),
    UNAUTHORIZED: i18nService.translate('auth', 'unauthorized'),
    FORBIDDEN: i18nService.translate('auth', 'forbidden'),
    TOKEN_EXPIRED: i18nService.translate('auth', 'tokenExpired'),
    GET_ME_SUCCESS: i18nService.translate('auth', 'getMeSuccess'),
    INVALID_PASSWORD: i18nService.translate('auth', 'invalidPassword'),
    CHANGE_PASSWORD_SUCCESS: i18nService.translate('auth', 'changePasswordSuccess'),
    UPDATE_ME_SUCCESS: i18nService.translate('auth', 'updateMeSuccess'),
  };
};

module.exports = authMessage;
