const { param } = require('express-validator');

const purchaseParamValidator = [
  param('courseId').isMongoId().withMessage('Invalid course id'),
];

module.exports = { purchaseParamValidator };
