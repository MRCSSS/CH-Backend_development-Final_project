/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import ContMongoDB from '../../containers/ContMongoDB.js';
import { logger } from '../../utils/config.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class UsersDaoMongoDB extends ContMongoDB {
    constructor() {
        super('users', {
            name:       { type: String, required: true },
            username:   { type: String, required: true },
            address:    { type: String, required: true },
            age:        { type: Number, required: true },
            password:   { type: String, required: true },
            phone:      { type: String, required: true },
            userImg:        { type: String, required: true },
        });
    }

    async searchUser(username) {
        try {
            const object = await this.collection.find({ 'username': username });
            return object.length != 0 ? object[0] : false;
        } catch (error) {
            logger.error(`{ error: '${error}' }`);
        }
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default UsersDaoMongoDB;