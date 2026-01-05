const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const passport = require('passport');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../schemas/auth.schema');
const { authLimiter } = require('../middlewares/rateLimiter');

router.post('/register', authLimiter, validate(registerSchema), AuthController.register);
router.post('/login', authLimiter, validate(loginSchema), passport.authenticate('local', { session: false }), AuthController.login);
router.post('/refresh', AuthController.refresh);

module.exports = router;