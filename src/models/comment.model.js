const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    check: { type: Boolean, default: false },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
    replyOnUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  {
    timestamps: true, toJSON: { virtuals: true },
  },
);

commentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent',
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
