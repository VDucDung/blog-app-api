const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      default: '',
    },
    categories: {
      type: Array,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
