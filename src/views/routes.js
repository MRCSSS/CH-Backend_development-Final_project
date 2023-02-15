/* ============================ MODULOS ============================= */
import { Router } from "express";
import * as controller from "./controller.js";
/* ====================== INSTANCIA DE ROUTER ======================= */
const viewsRoutes = Router();
/* ============================== RUTAS ============================= */
viewsRoutes.get('/',          controller.getRoot);
viewsRoutes.get('/cart',      controller.getCart);
viewsRoutes.get('/chat',      controller.getChat);
viewsRoutes.get('/login',     controller.getLogin);
viewsRoutes.get('/product/:id', controller.getProduct);
viewsRoutes.get('/products',  controller.getAllProducts);
viewsRoutes.get('/products/:category', controller.getCatProducts);
viewsRoutes.get('/register',  controller.getRegister);
viewsRoutes.get('/ticket/:id',   controller.getTicket);
/* ====================== MODULOS EXPORTADOS ======================== */
export default viewsRoutes;
