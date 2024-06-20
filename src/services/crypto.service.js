const CryptoJS = require('crypto-js');
const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const { authMessage } = require('../messages');

const objectToString = (obj) => {
  return JSON.stringify(obj);
};

const stringToObject = (str) => {
  return JSON.parse(str);
};

const encrypt = (plainText, secret) => {
  return CryptoJS.AES.encrypt(plainText, secret).toString();
};

const decrypt = (cipherText, secret) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const encryptObj = (obj, secret) => {
  return encrypt(objectToString(obj), secret);
};

const decryptObj = (cipherText, secret) => {
  try {
    return stringToObject(decrypt(cipherText, secret));
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, authMessage().INVALID_TOKEN);
  }
};

const expiresCheck = (token, secret, timeDiff = 0) => {
  const payload = decryptObj(token, secret);

  const isExpired = Date.now() + timeDiff > payload?.expires;

  return { isExpired, payload };
};

module.exports = {
  encrypt,
  decrypt,
  encryptObj,
  decryptObj,
  expiresCheck,
  objectToString,
  stringToObject,
};
