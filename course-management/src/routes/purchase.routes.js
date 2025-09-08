const router = require('express').Router();
const { purchaseCourse, getMyPurchases } = require('../controllers/purchase.controller');
const { auth } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { purchaseParamValidator } = require('../validators/purchase.validators');

router.post('/:courseId', auth, purchaseParamValidator, validate, purchaseCourse);

router.get('/me', auth, getMyPurchases);

module.exports = router;
