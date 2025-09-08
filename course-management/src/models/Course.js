const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: [true, 'Price is required'], min: 0 },
    instructor: { type: String, required: [true, 'Instructor is required'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
