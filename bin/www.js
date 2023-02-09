/* =================================== MODULES =================================== */
import app from '../app.js';
import { wsController } from '../src/services/services.indexController.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import config from '../src/config/config.js';
import logger from '../src/utils/logger.js';
/* ================================== INSTANCES ================================== */
const httpServer = createServer(app);
const port = normalizePort(config.port || '3000');
const io = new Server(httpServer);
const webSockerCtrllr = new wsController();
/* ================================= MIDDLEWARES ================================= */
/* ================================== FUNCTIONS ================================== */
function normalizePort(val) {           // Normalize a port into a number, string, or false.
    const port = parseInt(val, 10);

    if (isNaN(port)) { return val; }
    if (port >= 0) { return port; }

    return false;
}
/* =================================== SERVER  =================================== */
const server = httpServer.listen(port, () => {
    logger.info(`Server listening at PORT: ${port}`);
});

server.on('error', err => {
    logger.error(`Server error: ${err}`);
});
/* ================================== WEBSOCKET ================================== */
io.on('connection', socket => {
    webSockerCtrllr.chat(io, socket);
});