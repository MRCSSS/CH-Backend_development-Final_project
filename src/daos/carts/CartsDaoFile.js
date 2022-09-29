import ContFile from '../../containers/ContFile.js';

class CartsDaoFile extends ContFile {
    constructor() {
        super('DB_Carts.json');
    }

    async save( cart= { products: [] }) {
        return super.save(cart);
    }
}

export default CartsDaoFile;