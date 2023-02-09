/* =================================== MODULES =================================== */
import CartsDAOFactory from "./classes/DAOFactory.class.js";
import CustomError from '../../classes/CustomError.class.js';
import logger from '../../utils/logger.js';
import UsersDAOFactory from '../users/classes/DAOFactory.class.js';
/* ================================== INSTANCES ================================== */
const cartDAO = CartsDAOFactory.get();
const userDAO = UsersDAOFactory.get();

/* ================================== SERVICES  ================================== */
class cartService {
    createCart = async (mail) => {
        try {
            const user = await userDAO.searchUser(mail);
            const userID = user === null ? 0 : user.id;
            const newCart = {
                userID: userID,
                products: [],
            };
            const newCartId = await cartDAO.add(newCart);
            logger.info(`message: 'Cart with ID '${newCartId}' registered!!!'`);
        } catch (error) {
            throw new CustomError(error);
        }
    }

    getAllCarts = async () => {
        try {
            const carts = await cartDAO.getAll();
            logger.info(`message: 'Quantity of Carts: ${carts.length}'`);
            return carts;
        } catch (error) {
            throw new CustomError(error);
        }
    }

    deleteCart = async (cartId) => {
        try {
            await cartDAO.deleteById(cartId);
            logger.info(`message: 'Cart with ID '${cartId}' deleted!!!'`);
        } catch (error) {
            throw new CustomError(error);
        }
    }

    getProducts = async (cartId) => {
        try {
            const cart = await cartDAO.getById(cartId);
            logger.info(`message: 'Products of Cart with ID '${cartId}' found!!'`);
            return cart.products
        } catch (error) {
            throw new CustomError(error);
        }
    }

    updateProducts = async (cartId, products) => {
        try {
            await cartDAO.update(cartId, products);
            logger.info(`message: 'Cart with ID '${cartId}' updated!!'`);
        } catch (error) {
            throw new CustomError(error);
        }
    }

    deleteProduct = async (cartId, productId) => {
        try {
            const cart = await cartDAO.getById(cartId);
            const newProducts = await cart.products.filter(prod => prod.id !== productId);
            await cartDAO.update(cartId, {products:newProducts});
            logger.info(`message: 'Product deleted!!!'`);
        } catch (error) {
            throw new CustomError(error);
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default cartService;