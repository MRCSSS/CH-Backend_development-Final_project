/* =================================== MODULES =================================== */
import winston from 'winston';
import config from '../config/config.js';
/* ========================= LOGGER CONFIGURATOR OBJECT  ========================= */
let env;
let transport;

switch (config.server.NODE_ENV) {
    case 'development':
        env = 'dev';
        transport = [
            new winston.transports.File({
                maxsize: 5120000,
                maxFiles: 5,
                filename: `logs/${env}.log`,
                level: 'silly'
            }),
            new winston.transports.Console({ 
                level: 'silly' 
            }),
        ];
        break;
    case 'test':
        env = 'test';
        transport = [
            new winston.transports.File({
                maxsize: 5120000,
                maxFiles: 5,
                filename: `logs/${env}.log`,
                level: 'info'
            }),
            new winston.transports.Console({ 
                level: 'silly' 
            }),
        ];

        break;
    case 'production':
        env = 'prod';
        transport = [
            new winston.transports.File({
                maxsize: 5120000,
                maxFiles: 5,
                filename: `logs/${env}.log`,
                level: 'warn'
            })
        ];

        break;
    default:
        env = 'test';
        transport = [
            new winston.transports.File({
                maxsize: 5120000,
                maxFiles: 5,
                filename: `logs/${env}.log`,
                level: 'info'
            }),
            new winston.transports.Console({ 
                level: 'silly' 
            }),
        ];
        break;
}

const logger = winston.createLogger({ 
    format: winston.format.combine(
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.printf(info => `[${info.timestamp}][${env}:${info.level}] ${info.message}`)
    ),
    transports: transport
});

/* =============================== EXPORTED MODULES ============================== */
export default logger;