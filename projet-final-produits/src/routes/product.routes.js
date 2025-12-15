const express = require('express');
const ProductController = require('../controllers/product.controller');

const router = express.Router();

// GET /api/products - Récupérer tous les produits avec filtrage optionnel
router.get('/', ProductController.getAllProducts);

// GET /api/products/:id - Récupérer un produit par ID
router.get('/:id', ProductController.getProductById);

// POST /api/products - Créer un nouveau produit
router.post('/', ProductController.createProduct);

module.exports = router;
