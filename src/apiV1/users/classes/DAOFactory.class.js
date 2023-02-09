/* =================================== MODULES =================================== */
import config from '../../../config/config.js';
import UsersDAOFile from '../models/daos/file.DAO.js';
import UsersDAOMemory from '../models/daos/memory.DAO.js';
import UsersDAOMongoDB from '../models/daos/mongodb.DAO.js';
/* ===================================== DAO ===================================== */
class UsersDAOFactory {
    static get() {
        switch (config.server.PERS) {
            case 'file':
                return new UsersDAOFile();
            case 'memory':
                return new UsersDAOMemory();
            case 'mongodb':
                return new UsersDAOMongoDB();
            default:
                return new UsersDAOMemory();
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default UsersDAOFactory;