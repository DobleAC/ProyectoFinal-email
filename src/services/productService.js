const Product = require('../models/productModel');
const facturapi = require('../api/facturapi');

module.exports = {

    getProducts: async () => await Product.find(),

    createProduct: async (product) => {
        const facturapiProduct = await facturapi.createProduct(product);
        const newProduct = {
            _id: facturapiProduct.id,
            ...product  
        };

        return await Product.create(newProduct);
    },

    updateProduct: async ({_id, ...args}) => {
        await facturapi.updateProduct(_id, args);
        return await Product.findByIdAndUpdate(_id, args, { new: true });
    },

    deleteProduct: async (_id) => {
        await facturapi.deleteProduct(_id);
        return await Product.findByIdAndDelete(_id);
    },
}


