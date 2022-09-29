/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import express from 'express';
import morgan from 'morgan';
import cartsRouter from './routes/cart.routes.js';
import prodsRouter from './routes/products.routes.js';

/* ---------------------- INSTANCIA DE SERVER ----------------------- */
const app = express();

/* -------------------------- MIDDLEWARES --------------------------- */
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));

/* ------------------------------ RUTAS ----------------------------- */
app.use('/api/productos', prodsRouter);
app.use('/api/carrito', cartsRouter);

app.get('*', async (request, response) => {
    response.status(404).send('404 - Page not found!!');
});

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default app;