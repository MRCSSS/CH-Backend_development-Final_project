/* =================================== MODULES =================================== */
import MongoDBContainer from '../../../../containers/MongoDB.container.js';
import UsersModel from '../model.js';
import CustomError from '../../../../classes/CustomError.class.js';
import { asPOJO, renameField } from '../../../../utils/objectUtils.js';
/* ===================================== DAO ===================================== */
class UsersDAOMongoDB extends MongoDBContainer {
    constructor(){
        super(UsersModel);
    }

    async searchUser(mail) {
        try {
            await this.conn.connect();
            const user = await this.collection.find({ "username": mail }, { __v: 0 });
            if (user.length == 0) {
                return null;
            } else {
                const formatUser = renameField(asPOJO(user[0]), '_id', 'id');
                return formatUser;
            }
        } catch (error) {
            throw new CustomError({customCode:500,customName:'UsersDAOMongoDB: searchUser(mail)', customMsg:error.message});
        }  finally {
            await this.conn.disconnect();
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default UsersDAOMongoDB;