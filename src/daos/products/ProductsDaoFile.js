/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import ContFile from '../../containers/ContFile.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class ProductsDaoFile extends ContFile {
    constructor() {
        super('DB_Products.json');
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default ProductsDaoFile;