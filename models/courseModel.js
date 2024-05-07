const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Chapter schema with a video content field
const chapterSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  textContent: {
    type: String,
  },
  videoContent: {
    type: String, // Field for video URL
  },
});

// Module schema with embedded chapters
const moduleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  chapters: [chapterSchema], // Array of chapters
});

// Course schema with embedded modules
const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  discipline: {
    type: String,
  },
  institute: {
    type: String,
  },
  modules: [moduleSchema], // Array of modules
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;