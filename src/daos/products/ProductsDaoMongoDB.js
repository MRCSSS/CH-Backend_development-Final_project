import ContMongoDB from '../../containers/ContMongoDB.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class ProductsDaoMongoDB extends ContMongoDB {
    constructor() {
        super('products', {
            name:           { type: String, required: true },
            description:    { type: String, required: true },
            code:           { type: String, required: true },
            img:            { type: String, required: true },
            price:          { type: Number, required: true },
            stock:          { type: Number, required: true }
        });
    }

}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default ProductsDaoMongoDB;