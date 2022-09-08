/* ---------------------------- MODULOS ----------------------------- */
import { Router } from 'express';
import { ContainerFile } from '../container/ContFile.js';
import { config } from '../utils/config.js';

/* -------------------------- INSTANCIAS  --------------------------- */
const prodsRouter = Router();

/* ------------------------- BASE DE DATOS -------------------------- */
const prods = new ContainerFile('./db/DB_Products.json');

/* ------------------------ ADMIN ACCESS MW ------------------------- */
const isAdmin = config.isAdmin;
function adminOnly( req, res, next ) {
    !isAdmin ? 
    res.status(403).json({ code: 403, msg: `Forbbiden Access`, data: { method: req.method, path: `${req.baseUrl}${req.url}` } }) :
    next();
}

/* ------------------------------ RUTAS ----------------------------- */
prodsRouter.get('/', async (req, res)=>{
    res.status(200).json({ products: await prods.getAll() });
});

prodsRouter.get('/:id', async (req, res)=>{
    res.status(200).json({ product: await prods.getById(req.params.id) });
});

prodsRouter.post('/', adminOnly ,async (req, res)=>{
    res.status(201).json({ msg: 'Product added!', id_new_product: await prods.save(req.body) });
});

prodsRouter.put('/:id', adminOnly , async (req, res)=>{
    res.status(200).json(await prods.update(req.body, req.params.id));
});

prodsRouter.delete('/:id', adminOnly , async (req, res)=>{
    await prods.deleteById(req.params.id)
    res.status(200).json({ msg: 'Deleted!' });
});

prodsRouter.get('*', async (request, response) => {
    response.status(404).send({ code: 404, msg: 'Page not found!!' });
});

export default prodsRouter;