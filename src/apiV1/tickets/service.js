/* =================================== MODULES =================================== */
import TicketsDAOFactory from "./classes/DAOFactory.class.js";
import CustomError from '../../classes/CustomError.class.js';
import logger from '../../utils/logger.js';
import CartsDAOFactory from '../cart/classes/DAOFactory.class.js';
// import config from "../../config/config.js";
// import { createTransport } from 'nodemailer';

/* ================================== INSTANCES ================================== */
const ticketDAO = TicketsDAOFactory.get();
const cartDAO = CartsDAOFactory.get();

// const transporter = createTransport({
//     host: 'smtp.hostinger.com',
//     port: 465,
//     auth: {
//         user: config.mailSender,
//         pass: config.mailSendPswrd
//     }
// });



/* ================================== SERVICES  ================================== */
class ticketService {
    createTicket = async (email, products) => {
        try {
            const cart = await cartDAO.searchCart(email)
            await cartDAO.deleteById(cart.id);
            logger.info(`message: 'Cart with ID '${cart.id}' deleted!!!'`);
            const newTicketId = await ticketDAO.add({
                status: 'created',
                email: email,
                products: products
            });
            logger.info(`message: 'Ticket with ID '${newTicketId}' registered!!!'`);
            return newTicketId;
        } catch (error) {
            throw new CustomError(error);
        }
    }

    getTicket = async (ticketId) => {
        try {
            const ticket = await ticketDAO.getById(ticketId);
            logger.info(`message: 'Ticket with ID '${ticketId}' found!!'`);
            return ticket
        } catch (error) {
            throw new CustomError(error);
        }
    }

    confirmTicket = async (ticketId) => {
        try {
            const ticket = await ticketDAO.getById(ticketId);


            // async function sendMailFoo(message, url){
            //     try {
            //         let info = await transporter.sendMail(message);
            //         logger.info(`{ message sent: '${info.messageId}', to: '${info.envelope.to}' }`);
            //         logger.info(`{ message response: '${info.response}', from: '${info.envelope.to}' }`);
            //     } catch (err) {
            //         logger.error(`{ method: '${url}', function: 'sendMail(${message.to})', error: '${err.message}' }`);
            //     }   
            // }
            // async function mailer(req, res, next){
            //     const url = `${req.baseUrl}${req.url}`;
            //     let adminMessage;
            //     let userMessage;
            
            //     if(url === '/register'){
            //         adminMessage = {
            //             from: `"Sender" ${config.mailSender}`,
            //             to: `"Admin" ${config.mailAdmin}`,
            //             subject: 'Nuevo registro',
            //             text: `INFORMACIÓN DE NUEVO USUARIO\n NOMBRE: ${req.body.name}\n e-mail: ${req.body.username}\n EDAD: ${req.body.age}\n DIRECCIÓN: ${req.body.address}\n TELÉFONO: ${req.body.phone}\n AVATAR: ${req.file.filename}`,
            //             html: `<div>
            //                 <h2><b>Información de Nuevo Usuario</b></h2>
            //                 <div style=''>
            //                     <h5 style=''>NOMBRE: <small style=''>${req.body.name}</small></h5>
            //                     <h5 style=''>e-mail: <small style=''>${req.body.username}</small></h5>
            //                     <h5 style=''>EDAD: <small style=''>${req.body.age}</small></h5>
            //                     <h5 style=''>DIRECCIÓN: <small style=''>${req.body.address}</small></h5>
            //                     <h5 style=''>TELÉFONO: <small style=''>${req.body.phone}</small></h5>
            //                     <h5 style=''>AVATAR: <small style=''>${req.file.filename}</small></h5>
            //                 </div>
            //             </div>`,
            //             attachments: [{
            //                 path: `./public/images/${req.file.filename}`
            //             }]
            //         };
            //         userMessage = {
            //             from: `"e-commerce" ${config.mailSender}`,
            //             to: `"Dear ${req.body.name}!!" ${req.body.username}`,
            //             subject: `Bienvenido ${req.body.name}. Gracias por tu nuevo registro`,
            //             text: `INFORMACIÓN DE NUEVO USUARIO\n NOMBRE: ${req.body.name}\n e-mail: ${req.body.username}\n EDAD: ${req.body.age}\n DIRECCIÓN: ${req.body.address}\n TELÉFONO: ${req.body.phone}\n AVATAR: ${req.file.filename}`,
            //             html: `<div>
            //                 <h2><b>BIENVENIDO ${req.body.name}!!!</b></h2>
            //                 <div style=''>
            //                     <h5 style=''>NOMBRE: <small style=''>${req.body.name}</small></h5>
            //                     <h5 style=''>e-mail: <small style=''>${req.body.username}</small></h5>
            //                     <h5 style=''>EDAD: <small style=''>${req.body.age}</small></h5>
            //                     <h5 style=''>DIRECCIÓN: <small style=''>${req.body.address}</small></h5>
            //                     <h5 style=''>TELÉFONO: <small style=''>${req.body.phone}</small></h5>
            //                 </div>
            //             </div>`
            //         };
            //     } else if(url === '/cart'){
            //         adminMessage = {
            //             from: `"Sender" ${config.mailSender}`,
            //             to: `"Admin" ${config.mailAdmin}`,
            //             subject: 'Nuevo pedido',
            //             text: `INFORMACIÓN DE NUEVO PEDIDO`,
            //             html: `<div>
            //                 <h2><b>Información de Nuevo Pedido</b></h2>
            //             </div>`
            //         };
            //         userMessage = {
            //             from: `"e-commerce" ${config.mailSender}`,
            //             to: `"Dear ${req.body.name}!!" ${req.body.email}`,
            //             subject: `${req.body.name}, estamos atendiendo su nuevo pedido`,
            //             text: `INFORMACIÓN DE NUEVO PEDIDO`,
            //             html: `<div>
            //                 <h2><b>Información de Nuevo Pedido</b></h2>
            //             </div>`
            //         };
            //     // } else if(url === '/'){
            
            //     }
            //     await sendMailFoo(adminMessage,url);
            //     await sendMailFoo(userMessage,url);
            
            //     next();    
            // }
            

            const status = {status: 'generated'}
            await ticketDAO.update(ticketId, status);

            logger.info(`message: 'Order with ID '${ticketId}' generated!!'`);
        } catch (error) {
            throw new CustomError(error);
        }
    }

    // getAllTickets = async () => {
    //     try {
    //         const tickets = await ticketDAO.getAll();
    //         logger.info(`message: 'Quantity of Tickets: ${tickets.length}'`);
    //         return tickets;
    //     } catch (error) {
    //         throw new CustomError(error);
    //     }
    // }

    // deleteTicket = async (ticketId) => {
    //     try {
    //         await ticketDAO.deleteById(ticketId);
    //         logger.info(`message: 'Ticket with ID '${ticketId}' deleted!!!'`);
    //     } catch (error) {
    //         throw new CustomError(error);
    //     }
    // }

    // getUserTicket = async (userEmail) => {
    //     try {
    //         const ticket = await ticketDAO.searchTicket(userEmail)
    //         if(ticket != false){
    //             logger.info(`message: 'Ticket of ${userEmail} found!!'`);
    //             return ticket
    //         } else {
    //             logger.info(`message: 'Ticket of ${userEmail} not found!!'`);
    //             const newTicketId = await ticketDAO.add({ username: userEmail, products: []});
    //             logger.info(`message: 'Ticket with ID '${newTicketId}' registered!!!'`);
    //             const newTicket = await ticketDAO.searchTicket(userEmail)
    //             logger.info(`message: 'Ticket of ${userEmail} found!!'`);
    //             return newTicket;
    //         }
    //     } catch (error) {
    //         throw new CustomError(error);
    //     }
    // }

    // updateTicket = async (ticketId, ticketData) => {
    //     try {
    //         await ticketDAO.update(ticketId, ticketData);
    //         logger.info(`message: 'Ticket with ID '${ticketId}' updated!!'`);
    //     } catch (error) {
    //         throw new CustomError(error);
    //     }
    // }

    // deleteProduct = async (ticketId, productId) => {
    //     try {
    //         const ticket = await ticketDAO.getById(ticketId);
    //         const newProducts = await ticket.products.filter(prod => prod.id !== productId);
    //         await ticketDAO.update(ticketId, {products:newProducts});
    //         logger.info(`message: 'Product deleted!!!'`);
    //     } catch (error) {
    //         throw new CustomError(error);
    //     }
    // }
}
/* =============================== EXPORTED MODULES ============================== */
export default ticketService;