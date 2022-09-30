/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import mongoose from 'mongoose';
import config from '../config.js';
import moment from 'moment';

await mongoose.connect(config.mongodb.cnxStr);

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
            throw new Error(`getAll() error: ${error}`);
        }
    }

    async getById(id) {
        try {
            const object = await this.collection.find({ '_id': id });

            if ( object.length != 0 ) {
                return object;
            } else {
                throw new Error(`deleteById(id) error: doc not found`);
            }
    
        } catch (error) {
            throw new Error(`getById error: ${error}`)
        }
    }

    async save(obj) {
        try {
            let newObj = await this.collection.create({ ...obj, timestamp: moment().format('DD/MM/YY HH:mm:ss') });
            return newObj._id;
        } catch (error) {
            throw new Error(`save(obj) error: ${error}`);
        }
    }
        
    async deleteById(id) {
        try {
            await this.collection.deleteOne({ '_id': id });
        } catch (error) {
            throw new Error(`deleteById(id) error: ${error}`)
        }
    }

    // async deleteAll() {
    //     try {

    //     } catch (error) {
    //         console.log('deleteAll(): ', error);
    //     }
    // }

    async update(obj, id) {
        try {
            let beforObj = await this.collection.find({ '_id': id });

            await this.collection.replaceOne({ '_id': id }, obj);
            return { msg: 'Updated!', data: { 'before': beforObj, 'after': obj } }
        } catch (error) {
            throw new Error(`Update error: ${error}`);
        }
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default ContMongoDB;