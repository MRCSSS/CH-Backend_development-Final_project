/* =================================== MODULES =================================== */
import { Router } from "express";
import viewsController from "./controller.js";
/* ================================== INSTANCES ================================== */
const controller = new viewsController();
const viewsRoutes = Router();
/* =================================== ROUTES  =================================== */
viewsRoutes.get('/',            controller.getRoot);
viewsRoutes.get('/cart',        controller.getCart);
viewsRoutes.get('/chat',        controller.getChat);
viewsRoutes.get('/login',       controller.getLogin);
viewsRoutes.get('/product/:id', controller.getProduct);
viewsRoutes.get('/products',    controller.getAllProducts);
viewsRoutes.get('/products/:category', controller.getCatProducts);
viewsRoutes.get('/register',    controller.getRegister);
viewsRoutes.get('/ticket/:id',  controller.getTicket);
viewsRoutes.get('/tickets',     controller.getAllTicket);
/* =============================== EXPORTED MODULES ============================== */
export default viewsRoutes;
