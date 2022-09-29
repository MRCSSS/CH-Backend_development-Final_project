import ContMongoDB from '../../containers/ContMongoDB.js';

class ProductsDaoMongoDB extends ContMongoDB {
    constructor() {
        super('products', {
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true }
        });
    }

}

export default ProductsDaoMongoDB;