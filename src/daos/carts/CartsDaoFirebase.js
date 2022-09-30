/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import ContFirebase from '../../containers/ContFirebase.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class CartsDaoFirebase extends ContFirebase {
    constructor() {
        super('carts');
    }

    async save( cart= { products: [] }) {
        return super.save(cart);
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default CartsDaoFirebase;