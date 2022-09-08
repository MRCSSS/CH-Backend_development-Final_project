/* ---------------------------- MODULOS ----------------------------- */
import { Router } from 'express';
import { ContainerFile } from '../container/ContFile.js';

/* -------------------------- INSTANCIAS  --------------------------- */
const cartRouter = Router();

/* ------------------------- BASE DE DATOS -------------------------- */
const cart = new ContainerFile('./db/DB_Carts.json');
const prods = new ContainerFile('./db/DB_Products.json');

/* ------------------------------ RUTAS -----------------------------*/
cartRouter.post('/', async (req, res)=>{
    res.status(201).json({ id: await cart.save({ products: [] }) });
});

cartRouter.delete('/:id', async (req, res)=>{
    res.status(200).json(await prods.deleteById(req.params.id));
});

cartRouter.get('/:id/productos', async (req, res)=>{
    // const product = await cont.getById(req.params.id)
    // res.status(200).json(product);
});

cartRouter.post('/:id/productos', async (req, res)=>{
    // const newID = await cont.save(req.body);
    // const newProduct = {...req.body, id:newID}
    // res.status(201).json({msg: 'Agregado!', data: newProduct});
});

cartRouter.delete('/:id/productos/:id_prod', async (req, res)=>{
    const prodsInCart = await cart.getById
});

cartRouter.get('*', async (request, response) => {
    response.status(404).send('404 - Page not found!!');
});

export default cartRouter;