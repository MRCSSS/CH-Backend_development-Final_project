/* ============================ MODULOS ============================= */
import express from 'express';
import bcrypt from 'bcrypt';
import { usersDao } from '../daos/index.js';
import { logger } from '../utils/config.js';;

/* ====================== INSTANCIA DE ROUTER ======================= */
const register = express.Router();

/* ============================== RUTAS ============================= */
register.get('/', (req, res) => {
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    res.render('partials/register', {layout: 'register'});
});

register.post('/', async (req, res)=>{
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    const {name, email, age, password, phone, address } = req.body;
    const userExists = await usersDao.searchUser(name);

    if (userExists !== null) {
        res.render('partials/register-error', {layout: 'register'});
    } else {
        const newUser = {
            name,
            password: await bcrypt.hash(password, 10),
            email,
            age,
            address,
            phone
        };
        await usersDao.save(newUser);
        res.redirect('../login');
    }
})

register.get('*', async (request, response) => {
    logger.warn(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    response.status(404).send('404 - Page not found!!');
});

/* ====================== MODULOS EXPORTADOS ======================== */
export default register;