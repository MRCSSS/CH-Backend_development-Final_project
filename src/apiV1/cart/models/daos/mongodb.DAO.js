/* =================================== MODULES =================================== */
import MongoDBContainer from '../../../../containers/MongoDB.container.js';
import CartsModel from '../model.js';
// import CustomError from '../../../../classes/CustomError.class.js';
// import {asPOJO, renameField} from '../../../../utils/objectUtils.js';
/* ================================== INSTANCES ================================== */

/* ================================== FUNCTIONS ================================== */

/* ===================================== DAO ===================================== */
class CartsDAOMongoDB extends MongoDBContainer {
    constructor(){
        super(CartsModel);
    }

    // async searchCart(code) {
    //     try {
    //         await this.conn.connect();
    //         const product = await this.collection.find({ "code": code }, { __v: 0 });
    //         if (product.length == 0) {
    //             return false;
    //         } else {
    //             const formatProd = renameField(asPOJO(product[0]), '_id', 'id');
    //             return formatProd;
    //         }
    //     } catch (error) {
    //         throw new CustomError({customCode:500,customName:'CartsDAOMongoDB: searchProduct(code)', customMsg:error.message});
    //     }  finally {
    //         await this.conn.disconnect();
    //     }
    // }
}
/* =============================== EXPORTED MODULES ============================== */
export default CartsDAOMongoDB;