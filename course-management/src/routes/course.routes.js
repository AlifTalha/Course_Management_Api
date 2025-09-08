const router = require('express').Router();
const {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
} = require('../controllers/course.controller');
const validate = require('../middlewares/validate.middleware');
const { auth, authorize } = require('../middlewares/auth.middleware');
const { createCourseValidator, courseIdParamValidator } = require('../validators/course.validators');

router.get('/', getAllCourses);
router.get('/:id', courseIdParamValidator, validate, getCourseById);

router.post('/', auth, authorize('admin'), createCourseValidator, validate, createCourse);
router.delete('/:id', auth, authorize('admin'), courseIdParamValidator, validate, deleteCourse);

module.exports = router;
