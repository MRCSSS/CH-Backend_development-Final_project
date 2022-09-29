import ContMemory from '../../containers/ContMemory.js';

class CartsDaoMemory extends ContMemory {
    constructor() {
        super('DB_Carts.json');
    }

    async save( cart= { products: [] }) {
        return super.save(cart);
    }
}

export default CartsDaoMemory;