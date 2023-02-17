/* =================================== MODULES =================================== */
import MongoDBContainer from '../../../../containers/MongoDB.container.js';
import TicketsModel from '../model.js';
import CustomError from '../../../../classes/CustomError.class.js';
import {asPOJO, renameField} from '../../../../utils/objectUtils.js';
/* ================================== INSTANCES ================================== */

/* ================================== FUNCTIONS ================================== */

/* ===================================== DAO ===================================== */
class TicketsDAOMongoDB extends MongoDBContainer {
    constructor(){
        super(TicketsModel);
    }

    // async updateTicket(ticketId, products) {
    //     try {
    //         await this.conn.connect();
    //         const beforeProducts = (await this.collection.find({ "_id": ticketId }, { __v: 0 }))[0].products;
    //         if (beforeProducts.length < 1) {
    //             await this.collection.updateOne({ "_id": ticketId }, { $set: products});
    //         } else {
    //             let productsNow = [];
    //             for(let i = 0; i< products.products.length; i++){
    //                 let oldProduct = beforeProducts.find(({productId}) => productId == products.products[i].productId)
    //                 if(oldProduct != undefined){
    //                     const index = beforeProducts.findIndex(({productId}) => productId == products.products[i].productId);
    //                     const qty = parseInt(products.products[i].qty,10) + parseInt(oldProduct.qty,10);
    //                     const newProduct = {
    //                         productId: beforeProducts[i].productId,
    //                         qty: qty
    //                     }
    //                     productsNow.push(newProduct)
    //                     beforeProducts.splice(0, index+1);
    //                 } else {
    //                     productsNow.push(products.products[i])
    //                 }
    //             }
    //             await this.collection.updateOne({ "_id": ticketId }, { $set: {products: beforeProducts.concat(productsNow)}});
    //         }
    //     } catch (error) {
    //         throw new CustomError({customCode:404,customName:'MongoDBContainer: update(obj, id)', customMsg:error.message});
    //     }  finally {
    //         await this.conn.disconnect();
    //     }
    // }

    // async searchTicket(username) {
    //     try {
    //         await this.conn.connect();
    //         const ticket = await this.collection.find({ "username": username }, { __v: 0 });
    //         if (ticket.length == 0) {
    //             return false;
    //         } else {
    //             const formatProd = renameField(asPOJO(ticket[0]), '_id', 'id');
    //             return formatProd;
    //         }
    //     } catch (error) {
    //         throw new CustomError({customCode:500,customName:'TicketsDAOMongoDB: searchProduct(code)', customMsg:error.message});
    //     }  finally {
    //         await this.conn.disconnect();
    //     }
    // }
}
/* =============================== EXPORTED MODULES ============================== */
export default TicketsDAOMongoDB;