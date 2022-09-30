import ContMemory from '../../containers/ContMemory.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class ProductsDaoMemory extends ContMemory {
    constructor() {
        super('products');
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default ProductsDaoMemory;