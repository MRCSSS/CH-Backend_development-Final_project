/* =================================== MODULES =================================== */
import cartService from './service.js';
import {cartDTO, productCartDTO} from './dto.js';
import logger from '../../utils/logger.js';
import CustomError from '../../classes/CustomError.class.js';
/* ================================== INSTANCES ================================== */
const service = new cartService();
/* ================================= CONTROLLERS ================================= */
class cartsController {
    createCart= async (req,res) => {
        try {
            let userEmail;
            if (req.session.passport) {
                userEmail = req.session.passport.user;
            } else {
                userEmail = 0;
            }
            await service.createCart(userEmail);
            const customRes = {method: 'createCart', message: 'Cart created successfully!!!'};
            logger.info(`status: 201, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
            return res.status(201).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.message}`});
        }
    }

    getAllCarts= async (req,res) => {
        try {
            const allCarts = await service.getAllCarts();
            const DTOdata = allCarts.map(cart => {   
                return new cartDTO(cart);
            });
            const customRes = {method: 'getAllCarts', carts: DTOdata};
            logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify({method: 'getAllCarts', carts: DTOdata.length})}`);
            return res.status(200).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.name}: ${e.message}`});
        }
    }

    deleteCart= async (req,res) => {
        try {
            await service.deleteCart(req.params.id);
            const customRes = {method: 'deleteCart', message: `CartwithID '${req.params.id}' deleted!!!`};
            logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
            return res.status(200).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.name}: ${e.message}`});
        }
    }

    getCartProducts= async (req,res) => {
        try {
            const allCartProducts = await service.getProducts(req.params.id);
            const DTOdata = allCartProducts.map(product => {   
                return new productCartDTO(product);
            })
            const customRes = {method: 'getProducts', cart_products: DTOdata};
            logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify({method: 'getAllCarts', products: DTOdata.length})}`);
            return res.status(200).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.name}: ${e.message}`});
        }
    }

    updateCartProducts= async (req,res) => {
        try {
            await service.updateProducts(req.params.id, req.body);
            const customRes = {method: 'updateCartProducts', message: 'Products in Cart updated successfully!!!'}
            logger.info(`status: 201, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
            return res.status(201).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.message}`});
        }
    }

    deleteCartProduct= async (req,res) => {
        try {
            await service.deleteProduct(req.params.id, req.params.id_prod);
            const customRes = {method: 'deleteCartProduct', message: `Product with ID '${req.params.id_prod}' deleted of Cart withID '${req.params.id}'!!!`};
            logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
            return res.status(200).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.name}: ${e.message}`});
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default cartsController;