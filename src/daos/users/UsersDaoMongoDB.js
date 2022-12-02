/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import ContMongoDB from '../../containers/ContMongoDB.js';
import { logger } from '../../utils/config.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class UsersDaoMongoDB extends ContMongoDB {
    constructor() {
        super('users', {
            name:       { type: String, required: true },
            email:      { type: String, required: true },
            password:   { type: String, required: true },
            address:    { type: String, required: true },
            age:        { type: Number, required: true },
            phone:      { type: String, required: true },
            photo:      { type: String, required: true },
        });
    }

    async searchUser(name) {
        try {
            const object = await this.collection.find({ 'name': name });
            return object.length != 0 ? object[0] : null
        } catch (error) {
            logger.error(`{ error: '${error}' }`);
        }
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default UsersDaoMongoDB;