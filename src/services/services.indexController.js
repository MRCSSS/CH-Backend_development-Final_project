/* =================================== MODULES =================================== */
import logger from "../utils/logger.js";
import CustomError from "../classes/CustomError.class.js";
import chatService from './chat/chat.service.js';
/* ================================== INSTANCES ================================== */
const service = new chatService();
/* ============================== SERVICES CLASSES  ============================== */
class wsController {
    chat = async(io, socket) => {
        try {
            logger.info(`Client connected, ID: ${socket.id}`);
            await service.chat(io, socket);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`code: ${e.code}, ${e.name}: '${e.message}' `);
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export { wsController };