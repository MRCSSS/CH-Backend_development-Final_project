/* =================================== MODULES =================================== */
import Container from '../classes/Container.class.js';
import CustomError from '../classes/CustomError.class.js';
import MongoDBClient from '../classes/MongoDbClient.class.js';
import { asPOJO, renameField, removeField } from '../utils/objectUtils.js';
/* ================================== CONTAINER ================================== */
class MongoDBContainer extends Container {
    constructor(model) {
        super();
        this.collection = model;
        this.conn = MongoDBClient.getInstance();
    }

    async getAll() {
        try {
            await this.conn.connect();
            let all = await this.collection.find({});
            const allObjs = asPOJO(all);
            for (let i = 0; i < all.length; i++) {
                renameField(allObjs[i], '_id', 'id');
                removeField(allObjs[i],'__v');
              }
            return allObjs;
        } catch (error) {
            throw new CustomError({customCode:500,customName:'MongoDBContainer: getAll()',customMsg: error.message});
        }  finally {
            await this.conn.disconnect();
        }
    }

    async getById(id) {
        try {
            await this.conn.connect();
            const object = await this.collection.find({ "_id": id }, { __v: 0 });
            if (object.length == 0) {
                    throw new CustomError({customCode:404,customName:'MongoDBContainer: getById(id)',customMsg:`Object info not found, id: ${id}.`});
            } else {
                let finalObj = renameField(asPOJO(object[0]), '_id', 'id');
                return finalObj;
            }
        } catch (error) {
            throw new CustomError({customCode:404,customName:'MongoDBContainer: getById(id)', customMsg:error.message});
        }  finally {
            await this.conn.disconnect();
        }
    }

    async add(obj) {
        try {
            await this.conn.connect();
            const newObj = await this.collection.create({ ...obj, timestamp: `${(new Date()).toString()}` });
            const finalObj = renameField(asPOJO(newObj), '_id', 'id');
            return finalObj.id;
        } catch (error) {
            throw new CustomError({customCode:500,customName:'MongoDBContainer: add(obj)', customMsg:error.message});
        }  finally {
            await this.conn.disconnect();
        }
    }
        
    async deleteById(id) {
        try {
            await this.conn.connect();
            const object = await this.collection.find({ "_id": id }, { __v: 0 });
            if (object.length == 0) {
                throw new CustomError({customCode:404,customName:'MongoDBContainer: deleteById(id)',customMsg:`Object not found, id: ${id}.`});
            } else {
                await this.collection.deleteOne({ "_id": id }, { __v: 0 });
            }
        } catch (error) {
            throw new CustomError({customCode:404,customName:'MongoDBContainer: deleteById(id)', customMsg:error.message});
        }  finally {
            await this.conn.disconnect();
        }
    }

    async deleteAll() {
        try {
            await this.conn.connect();
            await this.collection.deleteMany({});
        } catch (error) {
            throw new CustomError({customCode:500,customName:'MongoDBContainer: deleteAll()', customMsg:error.message});
        }  finally {
            await this.conn.disconnect();
        }
    }

    async update(id, obj) {
        try {
            await this.conn.connect();
            const beforeObj = await this.collection.find({ "_id": id }, { __v: 0 });
            if (beforeObj.length == 0) {
                throw new CustomError({customCode:404,customName:'MongoDBContainer: update(obj, id)',customMsg:`Object not found, id: ${id}.`});
            } else {
                await this.collection.updateOne({ "_id": id }, { $set: obj});
                const newObj = await this.collection.find({ "_id": id }, { __v: 0 });
                const bObj = renameField(asPOJO(beforeObj[0]), '_id', 'id');
                const nObj = renameField(asPOJO(newObj[0]), '_id', 'id');
                return {before: bObj, after: nObj};
            }
        } catch (error) {
            throw new CustomError({customCode:404,customName:'MongoDBContainer: update(obj, id)', customMsg:error.message});
        }  finally {
            await this.conn.disconnect();
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default MongoDBContainer;
