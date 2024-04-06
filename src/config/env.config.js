require('dotenv').config();

const env = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoURI:
    process.env.MONGO_URI ||
    'mongodb+srv://vuducdung:vudung2003@cluster0.pozzglb.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp',
  jwt: {
    secretAccess: process.env.JWT_SECRET_ACCESS || 'secret-access',
    expiresAccessToken: process.env.JWT_EXPIRES_ACCESS_MINUTES || '10',
    secretRefresh: process.env.JWT_SECRET_REFRESH || 'secret-refresh',
    expiresRefreshToken: process.env.JWT_EXPIRES_REFRESH_MINUTES || '1000',
  },
};

module.exports = env;
