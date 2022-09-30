import ContMongoDB from '../../containers/ContMongoDB.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class CartsDaoMongoDB extends ContMongoDB {
    constructor() {
        super('carts', {
            timestamp: { type: String, required: true },
            productos: { type: [], required: true },
            id: { type: String, required: true }
        });
    }

    async save( cart= { products: [] }) {
        return super.save(cart);
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default CartsDaoMongoDB;