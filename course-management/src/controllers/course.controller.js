const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const Course = require('../models/Course');

exports.createCourse = asyncHandler(async (req, res) => {
  const { title, description, price, instructor } = req.body;
  const course = await Course.create({ title, description, price, instructor });
  res.status(201).json({ success: true, data: course });
});

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id);
  if (!course) return next(new ApiError(404, 'Course not found'));
  res.json({ success: true, message: 'Course deleted' });
});

exports.getAllCourses = asyncHandler(async (_req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json({ success: true, data: courses });
});

exports.getCourseById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) return next(new ApiError(404, 'Course not found'));
  res.json({ success: true, data: course });
});
