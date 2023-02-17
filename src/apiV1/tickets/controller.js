/* =================================== MODULES =================================== */
import ticketService from './service.js';
import ticketDTO from './dto.js';
import logger from '../../utils/logger.js';
import CustomError from '../../classes/CustomError.class.js';
/* ================================== INSTANCES ================================== */
const service = new ticketService();
/* ================================= CONTROLLERS ================================= */
class ticketsController {
    createTicket = async (req,res) => {
        try {
            const ticket = await service.createTicket(req.body.email,req.body.products);
            const customRes = {method: 'createTicket', message: 'Ticket created successfully!!!', ticket_id: ticket};
            logger.info(`status: 201, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
            return res.status(201).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.message}`});
        }
    }

    getTicket = async (req,res) => {
        try {
            const ticket = await service.getTicket(req.params.id);
            const customRes = {method: 'getTicket', message: `Ticket found!!`, ticket: new ticketDTO(ticket) };
            logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
            return res.status(200).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.name}: ${e.message}`});
        }
    }

    confirmTicket = async (req,res) => {
        try {
            await service.confirmTicket(req.params.id);
            const customRes = {method: 'confirmTicket', message: 'Order generated successfully!!!'}
            logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
            return res.status(201).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.message}`});
        }
    }


//     getAllTickets = async (req,res) => {
//         try {
//             const allTickets = await service.getAllTickets();
//             const DTOdata = allTickets.map(ticket => {   
//                 return new ticketDTO(ticket);
//             });
//             const customRes = {method: 'getAllTickets', tickets: DTOdata};
//             logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify({method: 'getAllTickets', tickets: DTOdata.length})}`);
//             return res.status(200).json(customRes);
//         } catch (error) {
//             const e = new CustomError(error);
//             logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
//             return res.status(e.code).json({error: `${e.name}: ${e.message}`});
//         }
//     }

//     deleteTicket = async (req,res) => {
//         try {
//             await service.deleteTicket(req.params.id);
//             const customRes = {method: 'deleteTicket', message: `TicketwithID '${req.params.id}' deleted!!!`};
//             logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
//             return res.status(200).json(customRes);
//         } catch (error) {
//             const e = new CustomError(error);
//             logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
//             return res.status(e.code).json({error: `${e.name}: ${e.message}`});
//         }
//     }

//     getTicketProducts = async (req,res) => {
//         try {
//             const allTicketProducts = await service.getProducts(req.params.id);
//             const DTOdata = allTicketProducts.map(product => {   
//                 return new productTicketDTO(product);
//             })
//             const customRes = {method: 'getProducts', ticket_products: DTOdata};
//             logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify({method: 'getAllTickets', products: DTOdata.length})}`);
//             return res.status(200).json(customRes);
//         } catch (error) {
//             const e = new CustomError(error);
//             logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
//             return res.status(e.code).json({error: `${e.name}: ${e.message}`});
//         }
//     }

//     updateTicket = async (req,res) => {
//         try {
//             await service.updateTicket(req.params.id, req.body);
//             const customRes = {method: 'updateTicket', message: 'Ticket updated successfully!!!'}
//             logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
//             return res.status(201).json(customRes);
//         } catch (error) {
//             const e = new CustomError(error);
//             logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
//             return res.status(e.code).json({error: `${e.message}`});
//         }
//     }

//     deleteTicketProduct = async (req,res) => {
//         try {
//             await service.deleteProduct(req.params.id, req.params.id_prod);
//             const customRes = {method: 'deleteTicketProduct', message: `Product with ID '${req.params.id_prod}' deleted of Ticket withID '${req.params.id}'!!!`};
//             logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
//             return res.status(200).json(customRes);
//         } catch (error) {
//             const e = new CustomError(error);
//             logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
//             return res.status(e.code).json({error: `${e.name}: ${e.message}`});
//         }
//     }
}
/* =============================== EXPORTED MODULES ============================== */
export default ticketsController;