/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import mongoose from 'mongoose';
import { config, logger } from '../utils/config.js';
import moment from 'moment';

await mongoose.connect(config.mongoDB.url);

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class ContMongoDB {
    constructor(collectionName, squema) {
        this.collection = mongoose.model(collectionName, squema);
    }

    async getAll() {
        try {
            let docs = await this.collection.find({});
            return docs;
        } catch (error) {
            logger.error(`{ method: 'getAll()', error: '${error}' }`);
        }
    }

    async getById(id) {
        try {
            const object = await this.collection.find({ '_id': id });

            if ( object.length != 0 ) {
                return object;
            } else {
                logger.error(`{ method: 'getById(id):collection.find', error: '${error}' }`);
            }
        } catch (error) {
            logger.error(`{ method: 'getById(id)', error: '${error}' }`);
        }
    }

    async save(obj) {
        try {
            let newObj = await this.collection.create({ ...obj, timestamp: moment().format('DD/MM/YY HH:mm:ss') });
            // return newObj._id;
        } catch (error) {
            logger.error(`{ method: 'save(obj)', '${error}' }`);
        }
    }
        
    async deleteById(id) {
        try {
            await this.collection.deleteOne({ '_id': id });
        } catch (error) {
            logger.error(`{ method: 'deleteById(id)', error: '${error}' }`);
        }
    }

    async update(obj, id) {
        try {
            let beforObj = await this.collection.find({ '_id': id });

            await this.collection.replaceOne({ '_id': id }, obj);
            return { msg: 'Updated!', data: { 'before': beforObj, 'after': obj } }
        } catch (error) {
            logger.error(`{ method: 'update(obj, id)', error: '${error}' }`);
        }
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default ContMongoDB;