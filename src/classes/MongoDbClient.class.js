/* =================================== MODULES =================================== */
import mongoose from 'mongoose';
import config from '../config/config.js';
import logger from '../utils/logger.js';
import CustomError from './CustomError.class.js';
import DBClient from './DbClient.class.js';
/* ================================== INSTANCES ================================== */
let instance = null;
/* ============================ MONGO DB CLIENT CLASS ============================ */
class MongoDbClient extends DBClient {
    constructor(){
        super();
        this.connected = false;
        this.client = mongoose;
        this.firstConnection = (new Date()).toLocaleDateString();
    }

    async connect(){
        try {
            await this.client.set('strictQuery', true);
            await this.client.connect(config.mongodb.url);
            this.connected = true;
            logger.info('Mongo DB Client connected!!');
        } catch (error) {
            throw new CustomError({customCode:500,customName:'MongoDbClient: connect()', customMsg:error.message});
        }
    }

    async disconnect(){
        try {
            await this.client.connection.close();
            this.connected = false;
            logger.info('Mongo DB Client disconnected!!');
        } catch (error) {
            throw new CustomError({customCode:500,customName:'MongoDbClient: disconnect()', customMsg:error.message});
        }
    }

    static getInstance() {
        if (!instance) {
            instance = new MongoDbClient();
        }
        return instance;
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default MongoDbClient;