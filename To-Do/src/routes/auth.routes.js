const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const passport = require('passport');


router.post('/register', AuthController.register);
router.post('/login', passport.authenticate('local', { session: false }), AuthController.login);
router.post('/refresh', AuthController.refresh);

module.exports = router;

