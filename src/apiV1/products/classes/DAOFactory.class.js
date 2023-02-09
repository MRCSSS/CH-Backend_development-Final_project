/* =================================== MODULES =================================== */
import config from '../../../config/config.js';
import ProductsDAOFile from '../models/daos/file.DAO.js';
import ProductsDAOMemory from '../models/daos/memory.DAO.js';
import ProductsDAOMongoDB from '../models/daos/mongodb.DAO.js';
/* ===================================== DAO ===================================== */
class ProductsDAOFactory {
    static get() {
        switch (config.server.PERS) {
            case 'file':
                return new ProductsDAOFile();
            case 'memory':
                return new ProductsDAOMemory();
            case 'mongodb':
                return new ProductsDAOMongoDB();
            default:
                return new ProductsDAOMemory();
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default ProductsDAOFactory;