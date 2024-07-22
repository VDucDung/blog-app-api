const LANGUAGE_DEFAULT = 'en';

const LOCALES = ['en', 'vi'];

const HEADER_NAME = 'accept-language';

const COOKIE_NAME = 'lang';

const REQUEST_USER_KEY = 'user';

const PATH_API_DEFAULT = '/api/v1';

const KEY_CACHE = 'key_cache';

const URL_HOST = {
  production: 'https://blog-app-api-go1a.onrender.com',
  development: 'http://localhost:3000',
};

const QUEUE_TYPES = {
  EMAIL_QUEUE: 'email_queue',
};

const TIME_CACHE_DEFAULT = 60;

const EXPIRES_TOKEN_EMAIL_VERIFY = 1000 * 60 * 10;

const EXPIRES_TOKEN_FOTGOT_PASSWORD = 1000 * 60 * 10;

const EXPIRES_TOKEN_VERIFY_OTP_FORGOT = 1000 * 60 * 10;

const EXPIRES_TOKEN_CAPTCHA = 1000 * 60 * 2;

const TIME_DIFF_EMAIL_VERIFY = 1000 * 60 * 3;

const TOKEN_TYPES = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  VERIFY: 'verify',
  FOTGOT: 'forgot',
  VERIFY_OTP: 'verify-otp',
};

const EMAIL_TYPES = {
  VERIFY: 'verify',
  FORGOT: 'forgot-password',
};

const EMAIL_SUBJECT = {
  VERIFY: '[Blog App] Verify your email address',
  FORGOT: '[Blog App] Confirm OTP Forgot Password',
};

const STATUS_FORGOT = {
  DONE: null,
  VERIFIED: 'verified',
  VERIFY_OTP: 'verifyOTP',
};

const LENGTH_OTP_DEFAULT = 6;

const LOG_DIR = 'logs';

const LOG_FILENAME = 'logger.log';

module.exports = {
  LANGUAGE_DEFAULT,
  LOCALES,
  HEADER_NAME,
  COOKIE_NAME,
  REQUEST_USER_KEY,
  PATH_API_DEFAULT,
  URL_HOST,
  TIME_CACHE_DEFAULT,
  TOKEN_TYPES,
  EXPIRES_TOKEN_EMAIL_VERIFY,
  EXPIRES_TOKEN_FOTGOT_PASSWORD,
  EXPIRES_TOKEN_VERIFY_OTP_FORGOT,
  EXPIRES_TOKEN_CAPTCHA,
  TIME_DIFF_EMAIL_VERIFY,
  EMAIL_TYPES,
  EMAIL_SUBJECT,
  STATUS_FORGOT,
  LENGTH_OTP_DEFAULT,
  QUEUE_TYPES,
  KEY_CACHE,
  LOG_DIR,
  LOG_FILENAME,
};
