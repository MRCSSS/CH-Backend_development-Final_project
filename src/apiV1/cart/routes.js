/* =================================== MODULES =================================== */
import { Router } from "express";    
import cartsController from './controller.js';
/* ================================== INSTANCES ================================== */
const controller = new cartsController();
const cartRouter = Router();
/* =================================== ROUTES  =================================== */
//     - Carts
cartRouter.route ('/')
    .post   (controller.createCart)
    .get    (controller.getAllCarts)
cartRouter.route ('/:id')
    .delete (controller.deleteCart)
    //     - Cart products
cartRouter.route ('/:id/products')
    .get    (controller.getCartProducts)
    .post   (controller.updateCartProducts)
cartRouter.route ('/:id/products/:id_prod')
    .delete (controller.deleteCartProduct)
/* =============================== EXPORTED MODULES ============================== */
export default cartRouter;
