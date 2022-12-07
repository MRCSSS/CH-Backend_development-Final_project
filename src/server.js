/* ====================== MODULOS IMPORTADOS ======================== */
import bcrypt from 'bcrypt'; // Encriptado de contraseñas por hashing
import connectMongo from 'connect-mongo'; // Conexión a MondoDB
import express from 'express'; // Entorno de trabajo para la appweb (web framework)
import { create } from 'express-handlebars'; // Plantillas con Express
import session from 'express-session'; // Middleware de sesiones para Express
import { createServer } from 'http';
import multer from 'multer';
import passport from "passport"; // Middleware de autehticación para Node
import { Strategy as LocalStrategy } from "passport-local"; // Módulo para usar username y psswrd de forma local
import path from 'path'; // Módulo para trabajar con paths de archivos y directorios
import { Server } from 'socket.io';
import { productsDao, usersDao } from './daos/index.js'; // Archivo principal de DAOs
import cartsRouter from './routes/cart.routes.js'; // Archivo de Ruta de Carts
import prodsRouter from './routes/products.routes.js'; // Archivo de Ruta de Products
import { config, logger } from './utils/config.js'; // Archivo de configuración
import { createTransport } from 'nodemailer';
import { unlink } from 'node:fs';

/* ========================== INSTANCIANDO ========================== */
const app = express();  // Instanciando Express (Creando aplicación)
const httpServer = createServer(app);
const io = new Server(httpServer);
const exphbs = create({ // Instanciando Handlebars con configuración
    defaultLayout: null,
    extname: 'hbs'
});
const MongoStore = connectMongo.create({    // Instanciando Conexión a MondoDB con configuración (PERSISTENCIA DE SESION MONGO)
    mongoUrl: config.mongoDB.url,
    ttl: 10 *60 // Minutos *60
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({storage: storage});
const transporter = createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    auth: {
        user: config.mailSender,
        pass: config.mailSendPswrd
    }
});
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
}));
    /* ----------------------- Functions ----------------------- */
function loggingReq(req, res, next) {
    logger.info(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    next();
}
async function regFunc(req, res, next) {
    const userExists = await usersDao.searchUser(req.body.username);
    if (userExists === false) {
        if (!req.file) {
            logger.error(`{ method: 'uploadImg()','${error}' }`);
        }
        const {name, username, age, password, phone, address} = req.body;
        const imgName = req.file.filename;
        const newUser = {
            name,
            password: await bcrypt.hash(password, 10),
            username,
            age,
            address,
            phone,
            userImg: imgName
        };
        await usersDao.save(newUser);
        next();
    } else {
        unlink(`${req.file.path}`, (error) => {
            if (error){
                logger.error(`{ method: 'unlink()','${error}' }`);
            }
            logger.info(`{ message: '${req.file.filename} was deleted' }`);
        });
          
        res.redirect('../register-error');
    }
}
async function mailer(req, res, next){
    const url = `${req.baseUrl}${req.url}`;

    if(url === '/register'){
        try {
            let adminMessage = {
                from: `"Sender" ${config.mailSender}`,
                to: `"Admin" ${config.mailAdmin}`,
                subject: 'Nuevo registro',
                text: `INFORMACIÓN DE NUEVO USUARIO\n NOMBRE: ${req.body.name}\n e-mail: ${req.body.username}\n EDAD: ${req.body.age}\n DIRECCIÓN: ${req.body.address}\n TELÉFONO: ${req.body.phone}\n AVATAR: ${req.file.filename}`,
                html: `<div>
                    <h2><b>Información de Nuevo Usuario</b></h2>
                    <div style=''>
                        <h5 style=''>NOMBRE: <small style=''>${req.body.name}</small></h5>
                        <h5 style=''>e-mail: <small style=''>${req.body.username}</small></h5>
                        <h5 style=''>EDAD: <small style=''>${req.body.age}</small></h5>
                        <h5 style=''>DIRECCIÓN: <small style=''>${req.body.address}</small></h5>
                        <h5 style=''>TELÉFONO: <small style=''>${req.body.phone}</small></h5>
                        <h5 style=''>AVATAR: <small style=''>${req.file.filename}</small></h5>
                    </div>
                </div>`,
                attachments: [{
                    path: `./public/images/${req.file.filename}`
                }]
            };
            let info = await transporter.sendMail(adminMessage);
            logger.info(`{ message sent: '${info.messageId}', to: '${info.envelope.to}' }`);
            logger.info(`{ message response: '${info.response}', from: '${info.envelope.to}' }`);
        } catch (err) {
            logger.error(`{ method: 'sendMail(adminMessage)', error: '${err.message}' }`);
        }   

        try {
            let userMessage = {
                from: `"e-commerce" ${config.mailSender}`,
                to: `"Dear ${req.body.name}!!" ${req.body.username}`,
                subject: `Bienvenido ${req.body.name}. Gracias por tu nuevo registro`,
                text: `INFORMACIÓN DE NUEVO USUARIO\n NOMBRE: ${req.body.name}\n e-mail: ${req.body.username}\n EDAD: ${req.body.age}\n DIRECCIÓN: ${req.body.address}\n TELÉFONO: ${req.body.phone}\n AVATAR: ${req.file.filename}`,
                html: `<div>
                    <h2><b>BIENVENIDO ${req.body.name}!!!</b></h2>
                    <div style=''>
                        <h5 style=''>NOMBRE: <small style=''>${req.body.name}</small></h5>
                        <h5 style=''>e-mail: <small style=''>${req.body.username}</small></h5>
                        <h5 style=''>EDAD: <small style=''>${req.body.age}</small></h5>
                        <h5 style=''>DIRECCIÓN: <small style=''>${req.body.address}</small></h5>
                        <h5 style=''>TELÉFONO: <small style=''>${req.body.phone}</small></h5>
                    </div>
                </div>`
            };
            let info = await transporter.sendMail(userMessage);
            logger.info(`{ message sent: '${info.messageId}', to: '${info.envelope.to}' }`);
            logger.info(`{ message response: '${info.response}', from: '${info.envelope.to}' }`);
        } catch (err) {
            logger.error(`{ method: 'transporter.sendMail(userMessage)', error: '${err.message}' }`);
        }   

    // } else if(url === '/'){

    // } else if(url === '/'){

    }
    next();    
}
async function WApper(req, res, next){
    next();    
}
function auth(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

    /* ----------------------- Passport ------------------------ */
passport.use(new LocalStrategy( // Middleware con estratégia local
    async function(username, password, done) {
        const user = await usersDao.searchUser(username);
        if (user === false) {
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
passport.serializeUser((user, done)=>{  // Serializa usuario a datos de sesión
    done(null, user.username);
});
passport.deserializeUser( async (username, done)=>{ // Deserializa usuario de sesión
    const user = await usersDao.searchUser(username);
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
app.get('/', loggingReq, (req, res) => {
    if(!req.user) {
        res.redirect('/login');
    } else {
        res.redirect('/home');
    }
});

app.get('/register', loggingReq, (req, res) => {
    res.render('partials/register', {layout: 'register'});
});

app.post('/register', loggingReq, upload.single('userImg'), regFunc, mailer,
    passport.authenticate('local', {
        successRedirect: '/home', 
        failureRedirect: '/login-error'
    })
);

app.get('/register-error', loggingReq, (req, res)=>{
    res.render('partials/register-error', {layout: 'register'});
});

app.get('/home', loggingReq, auth, async (req, res) => {
    const user = await usersDao.searchUser(req.session.passport.user);
    res.render('partials/home', {layout: 'home', user: user.name , username: user.username});
});

app.get('/login', loggingReq, (req, res) => {
    res.render('partials/login', {layout: 'login'});
});

app.post('/login', loggingReq,
    passport.authenticate('local', {
        successRedirect: '/home', 
        failureRedirect: '/login-error'
    })
);

app.get('/login-error', loggingReq, (req, res)=>{
    res.render('partials/login-error', {layout: 'login'});
});

app.post('/logout', loggingReq, auth, async (req, res)=> {
    const user = await usersDao.searchUser(req.user.username);
    
    req.logout(err => { if(err){ res.json({err}) }
        res.render('partials/logout', { layout: 'logout', user: user.name });
    });
});

app.get('/logout', loggingReq, (req, res)=>{
    res.redirect('/');
});

app.get('/cart', loggingReq, (req, res)=>{
    res.render('partials/cart', { layout: 'cart' });
});

app.post('/cart', loggingReq, (req, res)=>{
    res.redirect('/');
});

app.get('*', loggingReq, (req, res) => {
    logger.warn(`{ url: '${req.baseUrl}${req.url}', method: '${req.method}' }`);
    res.status(404).send('404 - Page not found!!');
});

app.use('/api/productos', prodsRouter);
app.use('/api/carrito', cartsRouter);

/* ============================ WEBSOCKET =========================== */
io.on('connection', async (socket) => {
    logger.info(`Client conected: ${socket.id}`);
    socket.emit('serv-prods', await productsDao.getAll());

    socket.on('client-prods', async (prod) => {
        await productsDao.save(prod);
        io.sockets.emit('serv-prods', await productsDao.getAll());
    });
});

/* ====================== MODULOS EXPORTADOS ======================== */
export default httpServer;
