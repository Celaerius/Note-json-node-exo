require ("reflect-metadata");
const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const userRoutes = require('./routes/user.routes');
const tagRoutes = require('./routes/tag.routes');
const passport = require('passport');
const { middlewareLogger } = require('./middlewares/logger.middleware');
const { errorHandler } = require('./errors/errorHandler');

const app = express();

app.use(express.json());
app.use(middlewareLogger);

app.use(passport.initialize());

app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tags', tagRoutes);

app.use(errorHandler);

module.exports = app;
