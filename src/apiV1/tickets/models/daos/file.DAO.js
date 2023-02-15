/* =================================== MODULES =================================== */
import FileContainer from '../../../../containers/MongoDB.container.js';
import config from '../../../../config/config.js';
/* ================================== INSTANCES ================================== */

/* ================================== FUNCTIONS ================================== */

/* ===================================== DAO ===================================== */
class TicketsDAOFile extends FileContainer {
    constructor(){
        super();
        this.ruta = `${config.fileSystem.path}/tickets.json`;
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default TicketsDAOFile;