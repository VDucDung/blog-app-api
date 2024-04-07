require('dotenv').config();

const env = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoURI:
    process.env.MONGO_URI ||
    'mongodb+srv://vuducdung:vudung2003@cluster0.pozzglb.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp',
  jwt: {
    secretAccess: process.env.JWT_SECRET_ACCESS || 'secret-access',
    expiresAccessToken: process.env.JWT_EXPIRES_ACCESS_MINUTES + 'm' || '10m',
    secretRefresh: process.env.JWT_SECRET_REFRESH || 'secret-refresh',
    expiresRefreshToken: process.env.JWT_EXPIRES_REFRESH_MINUTES + 'm' || '1200m',
  },
  rateLimit: {
    timeApp: process.env.RATE_LIMIT_TIME_APP || 5,
    totalApp: process.env.RATE_LIMIT_TOTAL_APP || 100,
    timeAuth: process.env.RATE_LIMIT_TIME_AUTH || 3,
    totalAuth: process.env.RATE_LIMIT_TOTAL_AUTH || 15,
  },
};

module.exports = env;
