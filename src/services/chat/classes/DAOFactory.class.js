/* =================================== MODULES =================================== */
import config from '../../../config/config.js';
import MessagesDAOFile from '../models/daos/file.DAO.js';
import MessagesDAOMemory from '../models/daos/memory.DAO.js';
import MessagesDAOMongoDB from '../models/daos/mongodb.DAO.js';
/* ===================================== DAO ===================================== */
class MessagesDAOFactory {
    static get() {
        switch (config.server.PERS) {
            case 'file':
                return new MessagesDAOFile();
            case 'memory':
                return new MessagesDAOMemory();
            case 'mongodb':
                return new MessagesDAOMongoDB();
            default:
                return new MessagesDAOMemory();
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default MessagesDAOFactory;