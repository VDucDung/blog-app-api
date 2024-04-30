const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    caption: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    body: { type: Object, required: true },
    image: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tags: { type: [String] },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  },
  {
    timestamps: true,
  },
);

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId',
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
