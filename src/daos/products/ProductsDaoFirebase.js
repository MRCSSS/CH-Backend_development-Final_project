import ContFirebase from '../../containers/ContFirebase.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class ProductsDaoFirebase extends ContFirebase {
    constructor() {
        super('products');
    }

}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default ProductsDaoFirebase;
