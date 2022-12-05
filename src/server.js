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
import { config, logger } from './utils/config.js';         // Archivo de configuración

/* ========================== INSTANCIANDO ========================== */
const app = express();  // Instanciando Express (Creando aplicación)
const exphbs = create({ // Instanciando Handlebars con configuración
    defaultLayout: null,
    extname: 'hbs'
})
const MongoStore = connectMongo.create({    // Instanciando Conexión a MondoDB con configuración (PERSISTENCIA DE SESION MONGO)
    mongoUrl: config.mongoDB.url,
    ttl: 10 *60 // Minutos *60
})
    
/* ========================== MIDDLEWARES =========================== */
app.use(express.json());    // Method in-built, reconoce el request object como JSON.
app.use(express.urlencoded({ extended: true}));    // Method in-built, reconoce el request object como strings o arreglos.
app.use(express.static('public'));  // Asigna carpeta pública estática
    /* --------------------- Session Setup --------------------- */
app.use(session({   // Parámetros de la sesion
    store: MongoStore,  // Conexión a MongoDB
    secret: config.mongoDB.key, // Clave usada para identificar cookie de ID de sesión
    resave: false,  // Forza a la sesion a guardarse sin interacción
    saveUninitialized: false,   // Forza guardar sesion no inicializada
    rolling: true   // Forza a cookie de identificador de sesion reiniciar con cada interacción
}))
    /* ----------------- Session Authorization ----------------- */
function auth(req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/');
}
    /* ----------------------- Passport ------------------------ */
passport.use(new Strategy(  // Middleware con estratégia local
    async function(email, password, done) {
        const user = await usersDao.searchUser(email);

        if (user === null) {
            return done(null, false);
        } else {
            const match = await bcrypt.compare(password, user.password);    // Compara contraseñas, usa encriptado

            if(!match){
                return done(null, false);
            }
            return done(null, user);
        }
    }
));
passport.serializeUser((user, done)=>{  // Serializa usuario a datos de sesión
    done(null, user.email);
});
passport.deserializeUser( async (email, done)=>{ // Deserializa usuario de sesión
    const user = await usersDao.searchUser(email);
    done(null, user);
});
app.use(passport.initialize()); // Inicia passport en la app
app.use(passport.session());    // Cambia usuario de request object en cada sesión
    /* ------------------ Motor de Plantillas ------------------ */
// Registra la instancia de Handlebars en la app Express
app.engine('hbs', exphbs.engine);
app.set('views', path.join(process.cwd(), 'src/views'));
app.set('view engine', 'hbs');
/* ============================== RUTAS ============================= */
app.use('/api/productos', prodsRouter);
app.use('/api/carrito', cartsRouter);

app.get('/', (req, res) => {
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    if(!req.session.user) {
        res.redirect('/login');
    } else {
        res.redirect('/home');
    }
})

app.get('/register', (req, res) => {
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    res.render('partials/register', {layout: 'register'});
});

app.post('/register', async (req, res)=>{
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    const {name, email, age, password, phone, address } = req.body;
    const userExists = await usersDao.searchUser(email);

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

app.get('/home', auth, async (req, res) => {
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    const user = await usersDao.searchUser(req.session.passport.email);
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
    const user = await usersDao.searchUser(req.session.passport.email);

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