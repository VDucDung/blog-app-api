const { LENGTH_OTP_DEFAULT } = require('../constants');

const generateOTP = (length = LENGTH_OTP_DEFAULT) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  const otp = Math.floor(min + Math.random() * (max - min + 1));
  return otp.toString();
};

module.exports = generateOTP;
