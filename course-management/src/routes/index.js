const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/courses', require('./course.routes'));
router.use('/purchases', require('./purchase.routes'));

module.exports = router;
