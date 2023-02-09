/* =================================== MODULES =================================== */
import CustomError from "./CustomError.class.js";
/* =========================== DATA BASE CLIENT CLASS  =========================== */
class DBClient {
    async connect(){
        throw new CustomError({customCode:501,customName:"DBClient: connect() error", customMsg:"not implemented!"});
    }

    async disconnect(){
        throw new CustomError({customCode:501,customName:"DBClient: disconnect() error", customMsg:"not implemented!"});
    }

    static getInstance() {
        throw new CustomError({customCode:501,customName:"DBClient: getInstance() error", customMsg:"not implemented!"});
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default DBClient;