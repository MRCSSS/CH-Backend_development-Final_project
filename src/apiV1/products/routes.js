/* =================================== MODULES =================================== */
import { Router } from "express";    
import productsController from './controller.js';
import multer from 'multer';
/* ================================== INSTANCES ================================== */
const controller = new productsController();
const prodRouter = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/product');
    },
    filename: (req, file, cb) => {
        const regex = /\s/g;
        const newFileName=file.originalname.replace(regex, '%');

        cb(null, `${Date.now()}_${newFileName}`);
    }
});
const upload = multer({storage: storage});
/* ==================================== ROUTES =================================== */
//     - All Products
prodRouter.route ('/')
    .get    (controller.getAllProducts)
    .delete (controller.deleteAllProducts)
//     - A Product
    .post   (upload.single('prodImg'), controller.addProduct)
prodRouter.route ('/:id')
    .get    (controller.getProduct)
    .put    (controller.updateProduct)
    .delete (controller.deleteProduct)
/* =============================== EXPORTED MODULES ============================== */
export default prodRouter;