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
cartRouter.route ('/:user_email')
    .get    (controller.getUserCart)
    //     - Cart products
cartRouter.route ('/:id/products')
    .get    (controller.getCartProducts)
    .post   (controller.updateCartProducts)
    .put    (controller.updateCart)
cartRouter.route ('/:id/products/:id_prod')
    .delete (controller.deleteCartProduct)
/* =============================== EXPORTED MODULES ============================== */
export default cartRouter;
