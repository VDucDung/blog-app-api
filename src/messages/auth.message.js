const authMessage = () => {
  return {
    INVALID_LOGIN: i18nService.translate('auth', 'invalidLogin'),
    LOGIN_SUCCESS: i18nService.translate('auth', 'loginSuccess'),
    REGISTER_SUCCESS: i18nService.translate('auth', 'registerSuccess'),
  };
};
