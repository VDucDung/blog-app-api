const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, required: true },
    email: { type: String, trim: true, unique: true, required: true },
    normalizedEmail: { type: String, trim: true, unique: true },
    password: { type: String, select: false, required: true },
    phone: { type: String, trim: true },
    dateOfBirth: { type: Date, default: '2000-01-01' },
    gender: { type: String, enum: ['male', 'female'], default: 'male' },
    isVerify: { type: Boolean, default: false },
    verifyExpireAt: { type: Date },
    verificationCode: { type: String, required: false },
    isLocked: { type: Boolean },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    avatar: { type: String, default: '' },
    lastActive: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  if (!!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return false;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};
const User = mongoose.model('User', userSchema);
module.exports = User;
