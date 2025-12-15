const express = require('express');
const productRoutes = require('./routes/product.routes');
const { errorHandler } = require('./errors/errorHandler');
const { middlewareLogger } = require('./middlewares/logger.middleware');

const app = express();

// Middlewares
app.use(express.json());
app.use(middlewareLogger);

// Routes
app.use('/api/products', productRoutes);

// Gestion des erreurs (doit être en dernier)
app.use(errorHandler);

module.exports = app;
