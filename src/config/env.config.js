require('dotenv').config();

const env = {
  port: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  mongoURI: process.env.MONGO_URI,
  listIPPing: process.env.LIST_IP_PING || '',
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    fullname: 'Blog App Admin',
  },
  jwt: {
    secretAccess: process.env.JWT_SECRET_ACCESS,
    expiresAccessToken: process.env.JWT_EXPIRES_ACCESS_MINUTES + 'm',
    secretRefresh: process.env.JWT_SECRET_REFRESH,
    expiresRefreshToken: process.env.JWT_EXPIRES_REFRESH_MINUTES + 'm',
  },
  secret: {
    tokenVerify: process.env.SECRET_TOKEN_VERIFY || 'secret-verify',
    tokenForgot: process.env.SECRET_TOKEN_FORGOT || 'secret-forgot',
    tokenVerifyOTP: process.env.SECRET_TOKEN_VERIFY_OTP || 'secret-verify-otp',
  },
  rateLimit: {
    timeApp: +process.env.RATE_LIMIT_TIME_APP || 5,
    totalApp: +process.env.RATE_LIMIT_TOTAL_APP || 100,
    timeAuth: +process.env.RATE_LIMIT_TIME_AUTH || 3,
    totalAuth: +process.env.RATE_LIMIT_TOTAL_AUTH || 15,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  image: {
    folderName: 'blog-app',
    typeAllow: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
    maxFileSize: (process.env.MAX_FILE_SIZE_IMAGE_MB || 3) * 1024 * 1024,
  },
  apiKey: {
    mailer: process.env.API_KEY_MAILER || 'mailer',
    cronJob: process.env.API_KEY_CRON_JOB || 'cron-job',
  },
};

module.exports = env;
