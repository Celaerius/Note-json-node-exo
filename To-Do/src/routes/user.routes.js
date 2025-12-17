const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controllers');
const { requireAuth } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/auth.middleware');
/* 
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

router.post('/', UserController.createUser); */

router.get('/profile', requireAuth, (req, res) => {
    res.status(200).json(req.user);
    
});
router.get('/admin-dashboard', requireAuth, requireRole('ADMIN'), (req, res) => {
    res.status(200).json({ message: 'Bienvenue sur le tableau de bord admin' });
});


module.exports = router;