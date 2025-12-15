const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const { middlewareLogger } = require('./middlewares/logger.middleware');

const app = express();

app.use(express.json());

app.use('/api/todos', todoRoutes);

app.use(middlewareLogger);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
