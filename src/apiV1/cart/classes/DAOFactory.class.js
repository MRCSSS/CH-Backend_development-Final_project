/* =================================== MODULES =================================== */
import config from '../../../config/config.js';
import CartsDAOFile from '../models/daos/file.DAO.js';
import CartsDAOMemory from '../models/daos/memory.DAO.js';
import CartsDAOMongoDB from '../models/daos/mongodb.DAO.js';
/* ================================== INSTANCES ================================== */

/* ================================== FUNCTIONS ================================== */

/* ===================================== DAO ===================================== */
class CartsDAOFactory {
    static get() {
        switch (config.server.PERS) {
            case 'file':
                return new CartsDAOFile();
            case 'memory':
                return new CartsDAOMemory();
            case 'mongodb':
                return new CartsDAOMongoDB();
            default:
                return new CartsDAOMemory();
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default CartsDAOFactory;