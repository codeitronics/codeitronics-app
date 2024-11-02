// models/blogModel.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description:{ type: String },
  categories: [String],
  tags: [String],
  content: { type: String, required: true },
  featureImage: { type: Object },
  featureImageURL: { type: String },
  contentImages: [String],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  isArchived: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  urlSlug: { type: String, unique: true, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorName :{ type: String },
});

module.exports = mongoose.model('Blog', blogSchema);
