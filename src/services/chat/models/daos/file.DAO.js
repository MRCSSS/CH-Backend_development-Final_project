/* =================================== MODULES =================================== */
import FileContainer from '../../../../containers/MongoDB.container.js';
import config from '../../../../config/config.js';
/* ================================== INSTANCES ================================== */

/* ================================== FUNCTIONS ================================== */

/* ===================================== DAO ===================================== */
class MessagesDAOFile extends FileContainer {
    constructor(){
        super();
        this.ruta = `${config.fileSystem.path}/messages.json`;
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default MessagesDAOFile;