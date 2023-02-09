/* =================================== MODULES =================================== */
import CustomError from "./CustomError.class.js";
/* ================================== CONTAINER ================================== */
class Container {    
    async getAll() {
        throw new CustomError({customCode:501,customName:'Container: getAll()', customMsg:'not implemented!'});
    }

    async getById(id) {
        throw new CustomError({customCode:501,customName:'Container: getById(id)', customMsg:'not implemented!'});
    }

    async add(obj) {
        throw new CustomError({customCode:501,customName:'Container: add(obj)', customMsg:'not implemented!'});
    }
        
    async deleteById(id) {
        throw new CustomError({customCode:501,customName:'Container: deleteById(id)', customMsg:'not implemented!'});
    }

    async deleteAll() {
        throw new CustomError({customCode:501,customName:'Container: deleteAll()', customMsg:'not implemented!'});
    }

    async update(id, obj) {
        throw new CustomError({customCode:501,customName:'Container: update(id, obj)', customMsg:'not implemented!'});
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default Container;