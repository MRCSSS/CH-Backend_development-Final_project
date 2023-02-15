/* =================================== MODULES =================================== */
import userService from './service.js';
import userDTO from "./dto.js";
import logger from '../../utils/logger.js';
import CustomError from '../../classes/CustomError.class.js';
/* ================================== INSTANCES ================================== */
const service = new userService();
/* ================================= CONTROLLERS ================================= */
class userController {
    register = async (req,res) => {
        try {
            const newUserId = await service.register(req.body);
            const customRes = {method: 'register', message: 'User registered successfully!!!', userID: newUserId}
            logger.info(`status: 201, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
            return res.status(201).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.message}`});
        }
    }

    login = async (req,res) => {
        try {
            logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}'`);
            return res.status(200);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.message}`});
        }
    }
    
    logout = async (req,res) => {
        try {
            req.session.destroy(async () => {
                await res.clearCookie('connect.sid');
                logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', {method: 'logout', message: 'Logged out successfully!!!'}`);
                return res.redirect('/');
            });
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.message}`});
        }
    }

    getUser = async (req, res) => {
        try {
            const user = await service.getUser(req.params.id);
            const userData = new userDTO(user);
            const customRes = {method: 'getUser', message: 'User found!!!', data: userData};
            logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
            return res.status(200).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.name}: ${e.message}`});
        }
    }

    updateUser = async (req,res) => {
        try {
            await service.updateUser(req.params.id, req.body);
            const customRes = {method: 'updateUser', message: `User with ID '${req.params.id}' updated!!!`};
            logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
            return res.status(200).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.name}: ${e.message}`});
        }
    }

    deleteUser = async (req,res) => {
        try {
            await service.deleteUser(req.params.id);
            const customRes = {method: 'deleteUser', message: `User with ID '${req.params.id}' deleted!!!`};
            logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify(customRes)}`);
            return res.status(200).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.name}: ${e.message}`});
        }
    }

    getAllUsers = async (req,res) => {
        try {
            const allUsers = await service.getAllUsers();
            const DTOdata = allUsers.map(user => {   
                return new userDTO(user);
            })
            const customRes = {method: 'getAllUsers', users: DTOdata};
            logger.info(`status: 200, route: '${req.method} ${req.baseUrl}${req.url}', ${JSON.stringify({method: 'getAllUsers', users: DTOdata.length})}`);
            return res.status(200).json(customRes);
        } catch (error) {
            const e = new CustomError(error);
            logger.error(`status: ${e.code}, route: '${req.method} ${req.baseUrl}${req.url}', ${e.name}: '${e.message}' `);
            return res.status(e.code).json({error: `${e.name}: ${e.message}`});
        }
    }

    deleteAllUsers = async (req,res) => {
        try {
            await service.deleteAllUsers();
            const customRes = {method: 'deleteAllUsers', message: `All users deleted!!!`};
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
export default userController;