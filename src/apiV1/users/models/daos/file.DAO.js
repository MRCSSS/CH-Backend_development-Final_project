/* =================================== MODULES =================================== */
import FileContainer from '../../../../containers/MongoDB.container.js';
import config from '../../../../config/config.js';
import CustomError from '../../../../classes/CustomError.class.js';
/* ================================== INSTANCES ================================== */

/* ================================== FUNCTIONS ================================== */

/* ===================================== DAO ===================================== */
class UsersDAOFile extends FileContainer {
    constructor(){
        super();
        this.ruta = `${config.fileSystem.path}/users.json`;
    }

    async searchUser (mail) {
        const objects = await this.getAll();
        try {
            obj = objects.find(obj => obj.username == mail);
            if ( obj.length == 0) {
                return null;
            } else {
                return obj;
            }
        } catch (error) {
            throw new CustomError({customCode:404,customName:'UsersDAOFile: getById(id)', customMsg:error.message});
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default UsersDAOFile;