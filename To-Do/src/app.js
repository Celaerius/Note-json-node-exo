const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const { middlewareLogger } = require('./middlewares/logger.middleware');
const { errorHandler } = require('./errors/errorHandler');

const app = express();

app.use(express.json());
app.use(middlewareLogger);

app.use('/api/todos', todoRoutes);

app.use(errorHandler);

module.exports = app;
