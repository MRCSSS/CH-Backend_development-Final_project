/* =================================== MODULES =================================== */
import ProductsDAOFactory from "./classes/DAOFactory.class.js";
import CustomError from '../../classes/CustomError.class.js';
import logger from '../../utils/logger.js';
import { unlink } from 'node:fs';
/* ================================== INSTANCES ================================== */
const DAO = ProductsDAOFactory.get();
/* ================================== SERVICES  ================================== */
class productService {
    addProduct = async (prod, file, filePath) => {
        try {
            const prodExists = await DAO.searchProduct(prod.code);
            if (prodExists === false) {
                const {code, name, description, categories, price, stock} = prod;
                const newProduct = {
                    code,
                    name,
                    description,
                    categories: categories.split(","),
                    price,
                    stock,
                    prodImg: file
                };
                const newProductId = await DAO.add(newProduct);
                logger.info(`message: 'Product with ID '${newProductId}' registered!!!'`);
            } else {
                unlink(`${filePath}`, (err) => {
                    if (err){
                        throw new CustomError({customCode:500,customName:'unlink() error'})
                    }
                    logger.info(`message: 'File '${file}' was deleted'`);
                });
                throw new CustomError({customCode:500,customName:'addProduct ',customMsg:`Product ${prod.prodname} exists!!`})
            }
        } catch (error) {
            unlink(`${filePath}`, (err) => {
                if (err){
                    throw new CustomError({customCode:500,customName:'unlink() error'})
                }
                logger.info(`message: 'File '${file}' was deleted'`);
            });

            throw new CustomError(error);
        }
    }

    getAllProducts = async () => {
        try {
            const products = await DAO.getAll();
            logger.info(`message: 'Quantity of Products: ${products.length}'`);
            return products;
        } catch (error) {
            throw new CustomError(error);
        }
    }

    deleteAllProducts = async () => {
        try {
            await DAO.deleteAll();
            logger.info(`message: 'All products deleted!!!'`);
        } catch (error) {
            throw new CustomError(error);
        }
    }

    getProduct = async (prodId) => {
        try {
            const prod = await DAO.getById(prodId);
            logger.info(`message: 'Product with ID '${prodId}' found!!'`);
            return prod
        } catch (error) {
            throw new CustomError(error);
        }
    }

    updateProduct = async (prodId, obj) => {
        try {
            if (obj.prodImg !== undefined) {
                const regex = /\s/gi;
                obj.prodImg = obj.prodImg.replace(regex, '%');
            }
            await DAO.update(prodId, obj);
            logger.info(`message: '${prodId} updated!!!'`);
        } catch (error) {
            throw new CustomError(error);
        }
    }

    deleteProduct = async (prodId) => {
        try {
            await DAO.deleteById(prodId);
            logger.info(`message: '${prodId} deleted!!!'`);
        } catch (error) {
            throw new CustomError(error);
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default productService;