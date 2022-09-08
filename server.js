/* ---------------------------- MODULOS ----------------------------- */
import express from 'express';
import morgan from 'morgan';
import cartRouter from './src/routes/cart.routes.js';
import prodsRouter from './src/routes/products.routes.js';

/* ---------------------- INSTANCIA DE SERVER ----------------------- */
const app = express();

/* -------------------------- MIDDLEWARES --------------------------- */
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));

/* ------------------------------ RUTAS ----------------------------- */
app.use('/api/productos', prodsRouter);
app.use('/api/carrito', cartRouter);

app.get('*', async (request, response) => {
    response.status(404).send('404 - Page not found!!');
});

/* ---------------------------- SERVIDOR ---------------------------- */
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server listening: http://localhost:${PORT}`);
})

server.on('error', err => {
    console.log(`Server error: ${err}`);
})
