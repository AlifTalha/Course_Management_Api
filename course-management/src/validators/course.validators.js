const { body, param } = require('express-validator');

const createCourseValidator = [
  body('title').notEmpty().withMessage('Title is required').trim(),
  body('description').optional().isString(),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
  body('instructor').notEmpty().withMessage('Instructor is required').trim(),
];

const courseIdParamValidator = [
  param('id').isMongoId().withMessage('Invalid course id'),
];

module.exports = { createCourseValidator, courseIdParamValidator };
