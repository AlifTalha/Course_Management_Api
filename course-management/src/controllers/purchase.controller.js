const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const Course = require('../models/Course');
const Purchase = require('../models/Purchase');

exports.purchaseCourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  const course = await Course.findById(courseId);
  if (!course) return next(new ApiError(404, 'Course not found'));

  const purchase = await Purchase.create({
    userId,
    courseId,
    amount: course.price,
  });

  res.status(201).json({ success: true, data: purchase });
});

exports.getMyPurchases = asyncHandler(async (req, res) => {
  const purchases = await Purchase.find({ userId: req.user._id })
    .populate('courseId')
    .sort({ createdAt: -1 });
    
  const data = purchases.map((p) => ({
    id: p._id,
    amount: p.amount,
    purchasedAt: p.purchasedAt,
    course: {
      id: p.courseId?._id,
      title: p.courseId?.title,
      description: p.courseId?.description,
      price: p.courseId?.price,
      instructor: p.courseId?.instructor,
    },
  }));

  res.json({ success: true, data });
});
