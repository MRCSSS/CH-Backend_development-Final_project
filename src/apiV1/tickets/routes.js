/* =================================== MODULES =================================== */
import { Router } from "express";    
import ticketsController from './controller.js';
/* ================================== INSTANCES ================================== */
const controller = new ticketsController();
const ticketRouter = Router();
/* =================================== ROUTES  =================================== */
ticketRouter.route ('/')
    // .get    (controller.getAllCarts)
    .post   (controller.createTicket)
ticketRouter.route ('/:id')
    .get    (controller.getTicket)
//     .delete (controller.deleteCart)
//     .put    (controller.updateCartProducts)
ticketRouter.route ('/:id/confirm')
    .post    (controller.confirmTicket)

/* =============================== EXPORTED MODULES ============================== */
export default ticketRouter;
