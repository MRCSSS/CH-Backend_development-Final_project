import ContMongoDB from '../../containers/ContMongoDB.js';

class CartsDaoMongoDB extends ContMongoDB {
    constructor() {
        super('carts', {
            products: { type: [], required: true }
        });
    }

    async save( cart= { products: [] }) {
        return super.save(cart);
    }
}

export default CartsDaoMongoDB;