const multer = require('multer');
const httpStatus = require('http-status');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const { env } = require('../config');
const ApiError = require('../utils/ApiError');
const { systemMessage } = require('../messages');

cloudinary.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: env.image.folderName,
    transformation: [{ width: 450, height: 450, crop: 'limit' }],
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const uploadImage = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = env.image.typeAllow;
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new ApiError(httpStatus.BAD_REQUEST, systemMessage().IMAGE_INVALID));
    }
  },
  limits: { fileSize: env.image.maxFileSize },
});

module.exports = { uploadImage };
