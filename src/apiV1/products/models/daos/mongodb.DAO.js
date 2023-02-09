/* =================================== MODULES =================================== */
import MongoDBContainer from '../../../../containers/MongoDB.container.js';
import ProductsModel from '../model.js';
import CustomError from '../../../../classes/CustomError.class.js';
import {asPOJO, renameField} from '../../../../utils/objectUtils.js';
/* ================================== INSTANCES ================================== */

/* ================================== FUNCTIONS ================================== */

/* ===================================== DAO ===================================== */
class ProductsDAOMongoDB extends MongoDBContainer {
    constructor(){
        super(ProductsModel);
    }

    async searchProduct(code) {
        try {
            await this.conn.connect();
            const product = await this.collection.find({ "code": code }, { __v: 0 });
            if (product.length == 0) {
                return false;
            } else {
                const formatProd = renameField(asPOJO(product[0]), '_id', 'id');
                return formatProd;
            }
        } catch (error) {
            throw new CustomError({customCode:500,customName:'ProductsDAOMongoDB: searchProduct(code)', customMsg:error.message});
        }  finally {
            await this.conn.disconnect();
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default ProductsDAOMongoDB;