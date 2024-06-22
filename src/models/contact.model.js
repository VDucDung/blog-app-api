const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  },
);
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
