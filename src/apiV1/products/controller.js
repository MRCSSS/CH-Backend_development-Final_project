/* =================================== MODULES =================================== */
import productService from './service.js';
import productDTO from "./dto.js";
import logger from '../../utils/logger.js';
import CustomError from '../../classes/CustomError.class.js';
/* ================================== INSTANCES ================================== */
const service = new productService();
/* ================================= CONTROLLERS ================================= */
class productsController {
    addProduct = async (req,res) => {
        try {
            await service.addProduct(req.body, req.file.filename, req.file.path);
            const customRes = {method: 'addProduct', message: 'Product added successfully!!!'};
            logger.info(`status: 201, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
            return res.status(201).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.message}`});
        }
    }

    getAllProducts= async (req,res) => {
        try {
            const allProducts = await service.getAllProducts();
            const DTOdata = allProducts.map(prod => {   
                return new productDTO(prod);
            });
            const customRes = {method: 'getAllProducts', products: DTOdata};
            logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify({method: 'getAllProducts', products: DTOdata.length})}`);
            return res.status(200).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.name}: ${e.message}`});
        }
    }
    
    getCategoryProducts= async (req,res) => {
        try {
            const allProducts = await service.getCategoryProducts(req.params.category);
            const DTOdata = allProducts.map(prod => {   
                return new productDTO(prod);
            });
            const customRes = {method: 'getCategoryProducts', products: DTOdata};
            logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify({method: 'getCategoryProducts', products: DTOdata.length})}`);
            return res.status(200).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.name}: ${e.message}`});
        }
    }
    
    getProduct= async (req,res) => {
        try {
            const product = await service.getProduct(req.params.id);
            const prodData = new productDTO(product);
            const customRes = {method: 'getProduct', message: 'Product found!!!', data: prodData};
            logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
            return res.status(200).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.name}: ${e.message}`});
        }
    }
    
    updateProduct= async (req,res) => {
        try {
            await service.updateProduct(req.params.id, req.body);
            const customRes = {method: 'updateProduct', message: `Product whit ID '${req.params.id}' updated!!!`};
            logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
            return res.status(200).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.name}: ${e.message}`});
        }
    }
    
    deleteProduct= async (req,res) => {
        try {
            await service.deleteProduct(req.params.id);
            const customRes = {method: 'deleteProduct', message: `Product whit ID '${req.params.id}' deleted!!!`};
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
export default productsController;