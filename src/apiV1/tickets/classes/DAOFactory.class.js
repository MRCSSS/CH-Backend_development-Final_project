/* =================================== MODULES =================================== */
import config from '../../../config/config.js';
import TicketsDAOFile from '../models/daos/file.DAO.js';
import TicketsDAOMemory from '../models/daos/memory.DAO.js';
import TicketsDAOMongoDB from '../models/daos/mongodb.DAO.js';
/* ================================== INSTANCES ================================== */

/* ================================== FUNCTIONS ================================== */

/* ===================================== DAO ===================================== */
class TicketsDAOFactory {
    static get() {
        switch (config.server.PERS) {
            case 'file':
                return new TicketsDAOFile();
            case 'memory':
                return new TicketsDAOMemory();
            case 'mongodb':
                return new TicketsDAOMongoDB();
            default:
                return new TicketsDAOMemory();
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default TicketsDAOFactory;