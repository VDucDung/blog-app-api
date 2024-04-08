const i18n = require('i18n');
const path = require('path');

const { COOKIE_NAME, HEADER_NAME, LANGUAGE_DEFAULT, LOCALES } = require('../constants');

class I18nService {
  constructor() {
    i18n.configure({
      locales: LOCALES,
      directory: path.join(__dirname, '../../locales'),
      defaultLocale: LANGUAGE_DEFAULT,
    });
  }

  isValidLanguage(lang) {
    return LOCALES.includes(lang);
  }

  setLocale(req, res) {
    const lang = this.isValidLanguage(req.query?.lang)
      ? req.query.lang
      : this.isValidLanguage(req.cookies?.[COOKIE_NAME])
        ? req.cookies[COOKIE_NAME]
        : this.isValidLanguage(req.headers[HEADER_NAME])
          ? req.headers[HEADER_NAME]
          : LANGUAGE_DEFAULT;
    i18n.setLocale(lang);
  }

  translate(model, key) {
    return i18n.__(model)[key];
  }
}

const i18nService = new I18nService();

module.exports = i18nService;
