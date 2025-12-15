const ProductService = require('../services/product.service');
const { asyncHandlers } = require('../utils/asyncHandlers');

class ProductController {

    static getAllProducts = asyncHandlers(async (req, res) => {
        const filters = {};
        if (req.query.minPrice !== undefined) {
            filters.minPrice = req.query.minPrice;
        }
        const products = await ProductService.findAll(filters);
        res.status(200).json(products);
    });

    static getProductById = asyncHandlers(async (req, res) => {
        const product = await ProductService.findById(parseInt(req.params.id));
        res.status(200).json(product);
    });

    static createProduct = asyncHandlers(async (req, res) => {
        const newProduct = await ProductService.createProduct(req.body);
        res.status(201).json(newProduct);
    });
}

module.exports = ProductController;
