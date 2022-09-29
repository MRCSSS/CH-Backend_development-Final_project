import ContMemory from '../../containers/ContMemory.js';

class ProductsDaoMemory extends ContMemory {
    constructor() {
        super('DB_Products.json');
    }
}

export default ProductsDaoMemory;