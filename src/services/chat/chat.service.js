/* =================================== MODULES =================================== */
import MessagesDAOFactory from "./classes/DAOFactory.class.js";
import CustomError from "../../classes/CustomError.class.js";
import { normalize, schema } from 'normalizr';

import logger from '../../utils/logger.js';
/* ================================== INSTANCES ================================== */
const DAO = MessagesDAOFactory.get();
const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });
const messageSchema = new schema.Entity('post', { author: authorSchema }, { idAttribute: 'id' });
const msgsSchema = new schema.Entity('posts', { messages: [messageSchema] }, { idAttribute: 'id' });
/* ================================== FUNCTIONS ================================== */
function normalizing (msgs) {
    return normalize(msgs, msgsSchema);
}
async function msgsNormalized () {
    const allMessages = DAO.getAll();
    return normalizing({ id: 'messages', allMessages});
}
/* ================================== SERVICES  ================================== */
class chatService {
    chat = async (io, socket) => {
        try {
            socket.emit('serv-msgs', await msgsNormalized());

            socket.on('client-msg', async (msg) => {
                await DAO.add(msg);
                io.sockets.emit('serv-msgs', await msgsNormalized());
            })
        } catch (error) {
            throw new CustomError({ code: error.code, customName: `chatService: chat(): ${error.name}`, message: error.message });
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default chatService;