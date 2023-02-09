/* =================================== MODULES =================================== */
import path from 'path';
import dotenv from 'dotenv';
/* ======================== GETTING ENVIROMENT VARIABLES  ======================== */
dotenv.config({ path: path.resolve(process.cwd(),`${process.env.NODE_ENV}.env`) });
/* ============================= CONFIGURATOS OBJECT ============================= */
 const config = {
    port:           process.env.PORT,
    server: {
        NODE_ENV:   process.env.NODE_ENV || 'development',
        PORT:       process.env.PORT || 3000,
        PERS:       process.env.PERS || 'memory',
    },
    fileSystem: {
        path: path.resolve(process.cwd(), 'DB'),
    },
    mongodb: {
        url:    process.env.MONGODB_URL,
        key:    process.env.MONGODB_KEY,
    },
    mailer: {
        mailAdmin:      process.env.MAIL_ADMIN,
        mailSender:     process.env.MAIL_SENDER,
        mailSendPswrd:  process.env.MAIL_SENDER_PSWRD,
    },
};
/* =============================== EXPORTED MODULES ============================== */
export default config;