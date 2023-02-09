/* =================================== MODULES =================================== */
import MongoDBContainer from '../../../../containers/MongoDB.container.js';
import MessagesModel from '../model.js';
/* ================================== INSTANCES ================================== */

/* ================================== FUNCTIONS ================================== */

/* ===================================== DAO ===================================== */
class MessagesDAOMongoDB extends MongoDBContainer {
    constructor(){
        super(MessagesModel);
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default MessagesDAOMongoDB;