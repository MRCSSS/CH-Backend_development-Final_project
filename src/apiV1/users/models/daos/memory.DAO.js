/* =================================== MODULES =================================== */
import MemoryContainer from '../../../../containers/Memory.container.js';
import CustomError from '../../../../classes/CustomError.class.js';
/* ===================================== DAO ===================================== */
class UsersDAOMemory extends MemoryContainer {
    constructor(){
        super();
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
            throw new CustomError({customCode:404,customName:'UsersDAOMemory: getById(id)', customMsg:error.message});
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default UsersDAOMemory;