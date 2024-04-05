require('dotenv').config();

const env = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoURI:
    process.env.MONGO_URI ||
    'mongodb+srv://vuducdung:vudung2003@cluster0.pozzglb.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp',
};

module.exports = env;
