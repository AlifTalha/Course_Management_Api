const router = require('express').Router();
const { register, login, getMe } = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { auth } = require('../middlewares/auth.middleware');
const { registerValidator, loginValidator } = require('../validators/auth.validators');

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.get('/me', auth, getMe);

module.exports = router;