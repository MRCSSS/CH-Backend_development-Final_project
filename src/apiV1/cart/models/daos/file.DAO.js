/* =================================== MODULES =================================== */
import FileContainer from '../../../../containers/MongoDB.container.js';
import config from '../../../../config/config.js';
/* ================================== INSTANCES ================================== */

/* ================================== FUNCTIONS ================================== */

/* ===================================== DAO ===================================== */
class CartsDAOFile extends FileContainer {
    constructor(){
        super();
        this.ruta = `${config.fileSystem.path}/carts.json`;
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default CartsDAOFile;