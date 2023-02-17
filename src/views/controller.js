/* =================================== MODULES =================================== */
import logger from '../utils/logger.js';
// import viewService from './service.js';
/* ================================== INSTANCES ================================== */
// const service = new viewService();
/* ================================== FUNCTIONS ================================== */
async function reqInit(req){
    const auth = req.session.passport ? req.session.passport : false;
    const user = auth.user;
    const route = `${req.method} ${req.baseUrl} ${req.url}`;

    return {auth, user, route} ;
}
/* ================================= CONTROLLERS ================================= */
class viewsController {
    getRoot = async (req,res) => {
        const {auth, route} = await reqInit(req);
        try {
            logger.info(`{ status: '200', route: '${route}' }`);
            if (auth === false){
                return res.redirect('/login');
            } else {
                return res.redirect('/products');
            }
        } catch (error) {
            logger.error(`{ status: 500, route: '${route}', ${error.name}: '${error.message}' }`);
            res.render('partials/error-page', {layout: 'login'});
        }
    }

    getCart = async (req,res) => {
        const {auth, user, route} = await reqInit(req);
        try {
            logger.info(`{ status: '200', route: '${route}' }`);
            if (auth === false){
                res.redirect('/');
            } else {
                const regex = /^[^\s]+/g;
                const name = user.name.match(regex);
                res.render('partials/cart', {layout: 'cart', name: name, email: user.username, userID: user.id });
            }
        } catch (error) {
            logger.error(`{ status: 500, route: '${route}', ${error.name}: '${error.message}' }`);
            res.render('partials/error-page', {layout: 'cart'});
        }
    }

    getChat = async (req,res) => {
        const {auth, user, route} = await reqInit(req);
        try {
            logger.info(`{ status: '200', route: '${route}' }`);
            if (auth === false){
                res.redirect('/');
            } else {
                const regex = /^[^\s]+/g;
                const name = user.name.match(regex);
                res.render('partials/chat', {layout: 'chat', name: name, email: user.username, userID: user.id });
            }
        } catch (error) {
            logger.error(`{ status: 500, route: '${route}', ${error.name}: '${error.message}' }`);
            res.render('partials/error-page', {layout: 'chat'});
        }
    }

    getLogin = async (req,res) => {
        const {route} = await reqInit(req);
        try {
            logger.info(`{ status: '200', route: '${route}' }`);
            res.render('partials/login', { layout: 'login' });
        } catch (error) {
            logger.error(`{ status: 500, route: '${route}', ${error.name}: '${error.message}' }`);
            res.render('partials/error-page', {layout: 'login'});
        }
    }

    getProduct = async (req,res) => {
        const {auth, user, route} = await reqInit(req);
        try {
            res.status(200);
            logger.info(`{ status: '200', route: '${route}' }`);
            if (auth === false){
                res.redirect('/');
            } else {
                const regex = /^[^\s]+/g;
                const name = user.name.match(regex);
                res.render('partials/product', { layout: 'product', name: name, email: user.username, userID: user.id });
            }
        } catch (error) {
            logger.error(`{ status: 500, route: '${route}', ${error.name}: '${error.message}' }`);
            res.render('partials/error-page', {layout: 'product'});
        }
    }

    getAllProducts = async (req,res) => {
        const {auth, user, route} = await reqInit(req);
        try {
            res.status(200);
            logger.info(`{ status: '200', route: '${route}' }`);
            if (auth === false){
                res.redirect('/');
            } else {
                const regex = /^[^\s]+/g;
                const name = user.name.match(regex);
                res.render('partials/products', { layout: 'products', name: name, email: user.username, userID: user.id });
            }
        } catch (error) {
            logger.error(`{ status: 500, route: '${route}', ${error.name}: '${error.message}' }`);
            res.render('partials/error-page', {layout: 'products'});
        }
    }

    getCatProducts = async (req,res) => {
        const {auth, user, route} = await reqInit(req);
        try {
            res.status(200);
            logger.info(`{ status: '200', route: '${route}' }`);
            if (auth === false){
                res.redirect('/');
            } else {
                const category = req.params.category;
                const regex = /^[^\s]+/g;
                const name = user.name.match(regex);
                res.render('partials/products', { layout: 'categories', category: category, name: name, email: user.username, userID: user.id });
            }
        } catch (error) {
            logger.error(`{ status: 500, route: '${route}', ${error.name}: '${error.message}' }`);
            res.render('partials/error-page', {layout: 'products'});
        }
    }

    getRegister = async (req,res) => {
        const {auth, route} = await reqInit(req);
        try {
            res.status(200);
            logger.info(`{ status: '200', route: '${route}' }`);
            if (auth === true){
                res.redirect('/');
            } else {
                res.render('partials/register', {layout: 'register'});
            }
        } catch (error) {
            logger.error(`{ status: 500, route: '${route}', ${error.name}: '${error.message}' }`);
            res.render('partials/error-page', {layout: 'register'});
        }
    }

    getTicket = async (req,res) => {
        const {auth, user, route} = await reqInit(req);
        try {
            res.status(200);
            logger.info(`{ status: '200', route: '${route}' }`);
            if (auth === false){
                res.redirect('/');
            } else {
                const regex = /^[^\s]+/g;
                const name = user.name.match(regex);
                res.render('partials/ticket', { layout: 'ticket', name: name, email: user.username, userID: user.id, ticket_id: req.params.id});
            }
        } catch (error) {
            logger.error(`{ status: 500, route: '${route}', ${error.name}: '${error.message}' }`);
            res.render('partials/error-page', {layout: 'ticket'});
        }
    }

    getAllTicket = async (req,res) => {
        const {auth, user, route} = await reqInit(req);
        try {
            res.status(200);
            logger.info(`{ status: '200', route: '${route}' }`);
            if (auth === false){
                res.redirect('/');
            } else {
                const regex = /^[^\s]+/g;
                const name = user.name.match(regex);
                res.render('partials/tickets', { layout: 'tickets', name: name, email: user.username, userID: user.id});
            }
        } catch (error) {
            logger.error(`{ status: 500, route: '${route}', ${error.name}: '${error.message}' }`);
            res.render('partials/error-page', {layout: 'tickets'});
        }
    }

}
/* =============================== EXPORTED MODULES ============================== */
export default viewsController;