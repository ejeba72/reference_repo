const { Schema, model } = require('mongoose');

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    author: {
      type: String,
      index: true,
    },
    user: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: 'draft',
      enum: ['draft', 'published'],
      index: true,
    },
    readCount: {
      type: Number,
      default: 0,
    },
    readingTime: {
      type: Number,
    },
    tags: {
      type: Array,
      index: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = model('Blog', blogSchema);

module.exports = { Blog };
