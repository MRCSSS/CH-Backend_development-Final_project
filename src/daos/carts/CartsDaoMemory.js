import ContMemory from '../../containers/ContMemory.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class CartsDaoMemory extends ContMemory {
    constructor() {
        super('carts', {carts: {}});
    }

    async save( cart= { products: [] }) {
        return super.save(cart);
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default CartsDaoMemory;