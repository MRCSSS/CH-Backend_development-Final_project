/* ====================== MODULOS IMPORTADOS ======================== */
import bcrypt from 'bcrypt';                            // Encriptado de contraseñas por hashing
import connectMongo from 'connect-mongo';               // Conexión a MondoDB
import express from 'express';                          // Entorno de trabajo para la appweb (web framework)
import { create } from 'express-handlebars';            // Plantillas con Express
import session from 'express-session';                  // Middleware de sesiones para Express
import passport from "passport";                        // Middleware de autehticación para Node
import Strategy from "passport-local";                  // Módulo para usar username y psswrd de forma local
import path from 'path';                                // Módulo para trabajar con paths de archivos y directorios
import { usersDao } from './daos/index.js';                 // Archivo principal de DAOs
import cartsRouter from './routes/cart.routes.js';          // Archivo de Ruta de Carts
import prodsRouter from './routes/products.routes.js';      // Archivo de Ruta de Products
import register from './routes/register.routes.js';         // Archivo de Ruta de Register
import { config, logger } from './utils/config.js';         // Archivo de configuración

/* ========================== INSTANCIANDO ========================== */
const app = express();  // Instanciando Express 
const exphbs = create({ // Instanciando Handlebars con configuración
    defaultLayout: null,
    extname: 'hbs'
})
const MongoStore = connectMongo.create({    // Instanciando Conexión a MondoDB con configuración (PERSISTENCIA DE SESION MONGO)
    mongoUrl: config.mongoDB.url,
    ttl: 10 *60 // Minutos *60
})

/* ========================== MIDDLEWARES =========================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
    /* --------------------- Session Setup --------------------- */
app.use(session({
    store: MongoStore,
    secret: config.mongoDB.key,
    resave: false,
    saveUninitialized: false,
    rolling: true
}))
    /* ----------------- Session Authorization ----------------- */
function auth(req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/');
}
    /* ----------------------- Passport ------------------------ */
passport.use(new Strategy(
    async function(username, password, done) {
        const user = await usersDao.searchUser(username);

        if (user === null) {
            return done(null, false);
        } else {
            const match = await bcrypt.compare(password, user.password);

            if(!match){
                return done(null, false);
            }
            return done(null, user);
        }
    }
));
passport.serializeUser((user, done)=>{
    done(null, user.username);
});
passport.deserializeUser( async (username, done)=>{
    const user = await usersDao.searchUser(username);
    done(null, user);
});
app.use(passport.initialize());
app.use(passport.session());
    /* ------------------ Motor de Plantillas ------------------ */
// Registra la instancia de Handlebars en la app Express
app.engine('hbs', exphbs.engine);
app.set('views', path.join(process.cwd(), 'src/views'));
app.set('view engine', 'hbs');

/* ============================== RUTAS ============================= */
app.use('/api/productos', prodsRouter);
app.use('/api/carrito', cartsRouter);
app.use('/register', register);

app.get('/', (req, res) => {
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    if(!req.session.user) {
        res.redirect('/login');
    } else {
        res.redirect('/home');
    }
})

app.get('/home', auth, async (req, res) => {
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    const user = await usersDao.searchUser(req.session.passport.user);
    res.render('partials/home', {layout: 'home', user: user.username , email: user.email});
});

app.get('/login', (req, res) => {
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    res.render('partials/login', {layout: 'login'});
});

app.post('/login', (req, res)=>{
    logger.info(`{ url: '${req.url}', method: '${req.method}' }`);},
    passport.authenticate('local', {
        successRedirect: '/home', 
        failureRedirect: '/login-error'
    })
);

app.get('/login-error', (req, res)=>{
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    res.render('partials/login-error', {layout: 'login'});
})

app.get('/logout', async (req, res)=> {
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    const user = await usersDao.searchUser(req.session.passport.user);

    req.session.destroy(err=>{
        if (err) {
            res.json({err});
        } else {
            res.render('partials/logout', { layout: 'logout', user: user.username });
        }
    });
});

app.get('*', (req, res) => {
    logger.warn(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    res.status(404).send('404 - Page not found!!');
});

/* ====================== MODULOS EXPORTADOS ======================== */
export default app;