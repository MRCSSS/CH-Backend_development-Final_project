/* =================================== MODULES =================================== */
import FileContainer from '../../../../containers/MongoDB.container.js';
import config from '../../../../config/config.js';
/* ================================== INSTANCES ================================== */

/* ================================== FUNCTIONS ================================== */

/* ===================================== DAO ===================================== */
class ProductsDAOFile extends FileContainer {
    constructor(){
        super();
        this.ruta = `${config.fileSystem.path}/products.json`;
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default ProductsDAOFile;