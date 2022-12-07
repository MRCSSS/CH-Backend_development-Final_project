/* ====================== MODULOS IMPORTADOS ======================== */
import * as dotenv from 'dotenv';
import winston from 'winston';
/* ================ OBTENIENDO VARIABLES DE ENTORNO ================= */
dotenv.config();
/* ============================ FUNCIONES =========================== */
function resVarEnv(variable) {
    const regex = /\n\s*/;
    const found = variable.match(regex)

    if ( found !== null && found.length > 0 ) {
        variable.replace(regex, '');
        return JSON.parse( variable )
    } else if ( variable === '' && variable === undefined && variable === null ) {
        return '';
    } else {
        return variable;
    }
}
/* ============================ VARIABLES =========================== */
const fileSys    = resVarEnv( process.env.FILESYSTEM );
const firebase   = resVarEnv( process.env.FIREBASE   );
const mariaDB    = resVarEnv( process.env.MARIADB    );
const mongoDB    = resVarEnv( process.env.MONGODB    );
const sqlite3    = resVarEnv( process.env.SQLITE3    );

/* =================== OBJETO CONFIGURADOR DE DB ==================== */
const config = {
    port:           process.env.PORT,
    nodeEnv:        process.env.NODE_ENV,
    dbType:         process.env.DB_TYPE,
    fileSystem:     fileSys,
    fireBase:       firebase,
    mariaDB:        mariaDB,
    mongoDB:        mongoDB,
    sqlite3:        sqlite3,
    mailAdmin:      process.env.MAIL_ADMIN,
    mailAdminPswrd: process.env.MAIL_ADMIN_PSWRD,
    mailSender:     process.env.MAIL_SENDER,
    mailSendPswrd:  process.env.MAIL_SENDER_PSWRD
};
/* ================= OBJETO CONFIGURADOR DE LOGGER ================== */
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({level: 'info'}),
        new winston.transports.File({ filename: 'logs/warn.log' ,level: 'warn'}),
        new winston.transports.File({ filename: 'logs/error.log' ,level: 'error'}),
    ]
});

export { config, logger };
