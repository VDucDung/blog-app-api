const i18n = require('i18n');
const path = require('path');

const cookieName = 'lang';
const headerName = 'accept-language';
const languageDefault = 'vi';

const locales = ['en', 'vi'];

class I18nService {
  constructor() {
    i18n.configure({
      locales: locales,
      directory: path.join(__dirname, '../../locales'),
      defaultLocale: languageDefault,
    });
  }

  isValidLanguage(lang) {
    return locales.includes(lang);
  }

  setLocale(req, res) {
    const lang = this.isValidLanguage(req.query?.lang)
      ? req.query.lang
      : this.isValidLanguage(req.cookies?.[cookieName])
        ? req.cookies[cookieName]
        : this.isValidLanguage(req.headers[headerName])
          ? req.headers[headerName]
          : languageDefault;
    i18n.setLocale(lang);
  }

  translate(model, key) {
    return i18n.__(model)[key];
  }
}

const i18nService = new I18nService();

module.exports = i18nService;
