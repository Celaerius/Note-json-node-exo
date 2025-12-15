let products = [];

class ProductModel {
    static findAll() {
        return Promise.resolve(products);
    }

    static findById(id) {
        const product = products.find(p => p.id === id);
        return Promise.resolve(product);
    }
    
    static create(product) {
        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            name: product.name,
            price: product.price,
            stock: product.stock || 0,
            active: product.active || true
        };
        
        products.push(newProduct);
        return Promise.resolve(newProduct);
    }
}

module.exports = ProductModel;
