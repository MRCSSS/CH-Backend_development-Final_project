import ContMemory from '../../containers/ContMemory.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class ProductsDaoMemory extends ContMemory {
    constructor() {
        super('DB_Products.json');
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default ProductsDaoMemory;