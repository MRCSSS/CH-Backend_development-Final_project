/* ====================== MODULOS IMPORTADOS ======================== */
import minimist from "minimist";                // Manejo de argumentos iniciales
import httpServer from './src/server.js';                  // Archivo de Servidor
import { config, logger } from './src/utils/config.js';     // Archivo de Configuración

/* ========================== INSTANCIANDO ========================== */
const options = {   // Opciones de configuración de minimist
    alias: {
        port: 'p',
    },
    default: {
        port: config.port,
    }
};
const args = minimist(process.argv.slice(2), options); // Obtención de argumentos con minimist

/* ============================ SERVIDOR ============================ */
const server = httpServer.listen(args.port, () => {    // Configurando acciones de servidor en escucha
    logger.info(`PID worker: ${process.pid} - Server listening at PORT: ${args.port}`);
});

server.on('error', err => { logger.error(`Server error: ${err}`); });   // Iniciando servidor
