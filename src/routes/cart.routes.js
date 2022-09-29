/* ---------------------------- MODULOS ----------------------------- */
import { Router } from 'express';
import * as dotenv from 'dotenv';
import { productsDao as prods, cartsDao as carts} from '../daos/index.js';

/* -------------------------- INSTANCIAS  --------------------------- */
dotenv.config();
const cartsRouter = Router();

/* ------------------------------ RUTAS -----------------------------*/
cartsRouter.get('/', async (req, res)=>{
    const products = await carts.getAll();
    res.status(200).json({ products: products.productos });
});

cartsRouter.post('/', async (req, res)=>{
    res.status(201).json({ id: await carts.save({ productos: [] }) });
});

cartsRouter.delete('/:id', async (req, res)=>{
    await carts.deleteById(req.params.id)
    res.status(200).json({ msg: 'Cart deleted!' });
});

cartsRouter.get('/:id/productos', async (req, res)=>{
    const cartSelected = await carts.getById(req.params.id)
    res.status(200).json({ products: cartSelected.productos });
});

cartsRouter.post('/:id/productos', async (req, res)=>{
    const cartSelected = await carts.getById(req.params.id)
    const prodSelected = await prods.getById(req.body.id)
    cartSelected.productos.push(prodSelected)
    res.status(200).json(await carts.update(cartSelected, req.params.id));
});

cartsRouter.delete('/:id/productos/:id_prod', async (req, res)=>{
    const cartSelected = await carts.getById(req.params.id)
    const index = cartSelected.productos.findIndex(prod => prod.id == req.params.id_prod)
    
    if (index != -1) {
        cartSelected.productos.splice(index, 1)
        res.status(200).json({ msg: 'Product in cart deleted!', description: await carts.update(cartSelected, req.params.id)})
    }
    res.status(204).json({ msg: '', description: '' })
    
});

cartsRouter.get('*', async (request, response) => {
    response.status(404).send('404 - Page not found!!');
});

export default cartsRouter;