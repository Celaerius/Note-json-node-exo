const ProductModel = require('../models/product.model');
const { ValidationError, NotFoundError } = require('../errors/ApiErrors');

class ProductService {
    static async findAll(filters = {}) {
        let products = await ProductModel.findAll();

        if (filters.minPrice !== undefined) {
            products = products.filter(p => p.price >= parseFloat(filters.minPrice));
        }

        return products;
    }

    static async findById(id) {
        const product = await ProductModel.findById(id);

        if (!product) {
            throw new NotFoundError(`Produit avec l'ID ${id} non trouvé`);
        }

        return product;
    }

    static async createProduct(product) {
        if (!product.name || product.name.trim() === '') {
            throw new ValidationError('Nom obligatoire, veuillez le fournir.');
        }

        if (product.price == null || isNaN(product.price) || product.price <= 0) {
            throw new ValidationError('Le prix doit être positif (> 0).');
        }

        if (product.stock != null && (isNaN(product.stock) || product.stock < 0)) {
            throw new ValidationError('Le stock ne peut pas être négatif.');
        }

        return await ProductModel.create(product);
    }
}

module.exports = ProductService;
