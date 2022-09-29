import ContMemory from '../../containers/ContMemory.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class CartsDaoMemory extends ContMemory {
    constructor() {
        super('DB_Carts.json');
    }

    async save( cart= { products: [] }) {
        return super.save(cart);
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default CartsDaoMemory;