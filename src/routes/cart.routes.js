/* ---------------------------- MODULOS ----------------------------- */
import { Router } from 'express';
import { ContainerFile } from '../container/ContFile.js';

/* -------------------------- INSTANCIAS  --------------------------- */
const cartRouter = Router();

/* ------------------------- BASE DE DATOS -------------------------- */
const carts = new ContainerFile('./db/DB_Carts.json');
const prods = new ContainerFile('./db/DB_Products.json');

/* ------------------------------ RUTAS -----------------------------*/
cartRouter.post('/', async (req, res)=>{
    res.status(201).json({ id: await carts.save({ productos: [] }) });
});

cartRouter.delete('/:id', async (req, res)=>{
    await carts.deleteById(req.params.id)
    res.status(200).json({ msg: 'Cart deleted!' });
});

cartRouter.get('/:id/productos', async (req, res)=>{
    const cartSelected = await carts.getById(req.params.id)
    res.status(200).json({ products: cartSelected.productos });
});

cartRouter.post('/:id/productos', async (req, res)=>{
    const cartSelected = await carts.getById(req.params.id)
    const prodSelected = await prods.getById(req.body.id)
    cartSelected.productos.push(prodSelected)
    res.status(200).json(await carts.update(cartSelected, req.params.id));
});

cartRouter.delete('/:id/productos/:id_prod', async (req, res)=>{
    const cartSelected = await carts.getById(req.params.id)
    const index = cartSelected.productos.findIndex(prod => prod.id == req.params.id_prod)
    
    if (index != -1) {
        cartSelected.productos.splice(index, 1)
        res.status(200).json({ msg: 'Product in cart deleted!', description: await carts.update(cartSelected, req.params.id)})
    }
    res.status(204).json({ msg: '', description: '' })
    
});

cartRouter.get('*', async (request, response) => {
    response.status(404).send('404 - Page not found!!');
});

export default cartRouter;