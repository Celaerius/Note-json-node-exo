const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticket.controller');
const { requireAuth } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/auth.middleware');

router.post('/create', requireAuth, (req, res) => {
    TicketController.createTicket(req, res);
});

router.get('/support-dashboard', requireAuth, requireRole('SUPPORT'), (req, res) => {
    res.status(200).json(req.body);
});

router.get('/client-dashboard', requireAuth, requireRole('CLIENT'), (req, res) => {
    res.status(200).json(req.body);
});

router.patch('/update-ticket/:id', requireAuth, requireRole('SUPPORT'), (req, res) => {
    res.status(200).json(req.body);
});

module.exports = router;

