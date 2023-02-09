/* =================================== MODULES =================================== */
import connectMongo from 'connect-mongo';                       // Conexión a MondoDB
import express from 'express';                                  // Entorno de trabajo para la appweb (web framework)
import { create } from 'express-handlebars';                    // Plantillas con Express
import session from 'express-session';                          // Middleware de sesiones para Express
import path from 'path';                                        // Módulo para trabajar con paths de archivos y directorios
import router from './src/routers/index.routes.js';             // Router de API REST FULL 
import viewsRoutes from './src/views/routes.js';                // Router de vistas
import config from './src/config/config.js';                    // Archivo de configuración
import cookieParser  from 'cookie-parser';                      // Módulo para parseo de cookies
/* ================================== INSTANCES ================================== */
const app = express();                                          // Instanciando Express (Creando aplicación)
const exphbs = create({                                         // Instanciando Handlebars con configuración
    defaultLayout: null,                                            // Inhabilitando capa default de Handlebars
    extname: 'hbs',                                                 // Declarando extensión de archivos Handlebars
});
const MongoStore = connectMongo.create({                        // Instanciando Conexión a MongoDB con configuración (PERSISTENCIA DE SESION MONGO)
    mongoUrl: config.mongodb.url,                                   // URL de base de datos MongoDB
    ttl: 10 *60,                                                    // Tiempo de sesión
}); 
/* ================================= MIDDLEWARES ================================= */
app.use(express.static('public'));                              // Asigna carpeta pública estática
app.use(express.urlencoded({ extended: true}));                 // Method in-built, reconoce el request object como strings o arreglos.
app.use(express.json());                                        // Method in-built, reconoce el request object como JSON.
app.use(cookieParser());                                        // Parsea el contenido de cookies
/*     ---------------------------- Session Setup ----------------------------     */
app.use(session({                                               // Parámetros de la sesion
    store: MongoStore,                                              // Conexión a MongoDB
    secret: config.mongodb.key,                                     // Clave usada para identificar cookie de ID de sesión
    resave: false,                                                  // Forza a la sesion a guardarse sin interacción
    saveUninitialized: false,                                       // Forza guardar sesion no inicializada
    rolling: true,                                                  // Forza a cookie de identificador de sesion reiniciar con cada interacción
}));
/*     --------------------------- Motor Templates ---------------------------     */
app.engine('hbs', exphbs.engine);                               // Declarando motor de plantillas en aplicación y su configuración
app.set('views', path.join(process.cwd(), 'src/views'));        // Declarando path de vistas de motor de plantillas
app.set('view engine', 'hbs');                                  // Declarando extensión de Handlebars
/* ==================================== ROUTES =================================== */
app.use('/apiV1', router);                                      // Declarando Router de API REST FULL en aplicación
app.use('/', viewsRoutes);                                      // Declarando Router de vistas en aplicación
/* =============================== EXPORTED MODULES ============================== */
export default app;                                             // Exportando aplicacion para su implementación en otros módulos