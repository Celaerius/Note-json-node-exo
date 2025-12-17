require ("reflect-metadata");
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const ticketRoutes = require('./routes/ticket.routes');
const passport = require('passport');
const { middlewareLogger } = require('./middlewares/logger.middleware');
const { errorHandler } = require('./errors/errorHandler');

const app = express();

app.use(express.json());
app.use(middlewareLogger);

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

app.use(errorHandler);

module.exports = app;
