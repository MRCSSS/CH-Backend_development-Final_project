/* ====================== MODULOS IMPORTADOS ======================== */
import { config } from '../utils/config.js';
/* ============================ VARIABLES =========================== */
let productsDao;
let cartsDao;
let usersDao;

/* =================== DECLARACIÓN DE DB ELEGIDA ==================== */
switch (config.dbType) {
    case 'fileSystem':
        const { default: ProductsDaoFile } = await import('./products/ProductsDaoFile.js');
        const { default: CartsDaoFile } = await import('./carts/CartsDaoFile.js');
        const { default: UsersDaoFile } = await import('./users/UsersDaoFile.js');

        productsDao = new ProductsDaoFile();
        cartsDao = new CartsDaoFile();
        usersDao = new UsersDaoFile();
        
        break;

    case 'firebase':
        const { default: ProductsDaoFirebase } = await import('./products/ProductsDaoFirebase.js');
        const { default: CartsDaoFirebase } = await import('./carts/CartsDaoFirebase.js');
        const { default: UsersDaoFirebase } = await import('./users/UsersDaoFirebase.js');

        productsDao = new ProductsDaoFirebase();
        cartsDao = new CartsDaoFirebase();
        usersDao = new UsersDaoFirebase();
        
        break;

    case 'mariadb':
        const { default: ProductsDaoMariaDB } = await import('./products/ProductsDaoMariaDB.js');
        const { default: CartsDaoMariaDB } = await import('./carts/CartsDaoMariaDB.js');
        const { default: UsersDaoMariaDB } = await import('./users/UsersDaoMariaDB.js');

        productsDao = new ProductsDaoMariaDB();
        cartsDao = new CartsDaoMariaDB();
        usersDao = new UsersDaoMariaDB();
        
        break;

    case 'mongodb':
        const { default: ProductsDaoMongoDB } = await import('./products/ProductsDaoMongoDB.js');
        const { default: CartsDaoMongoDB } = await import('./carts/CartsDaoMongoDB.js');
        const { default: UsersDaoMongoDB } = await import('./users/UsersDaoMongoDB.js');

        productsDao = new ProductsDaoMongoDB();
        cartsDao = new CartsDaoMongoDB();
        usersDao = new UsersDaoMongoDB();
        
        break;

    case 'sqlite3':
        const { default: ProductsDaoSqlite3 } = await import('./products/ProductsDaoSqlite3.js');
        const { default: CartsDaoSqlite3 } = await import('./carts/CartsDaoSqlite3.js');
        const { default: UsersDaoSqlite3 } = await import('./users/UsersDaoSqlite3.js');

        productsDao = new ProductsDaoSqlite3();
        cartsDao = new CartsDaoSqlite3();
        usersDao = new UsersDaoSqlite3();
        
        break;

    default:
        const { default: ProductsDaoMemory } = await import('./products/ProductsDaoMemory.js');
        const { default: CartsDaoMemory } = await import('./carts/CartsDaoMemory.js');
        const { default: UsersDaoMemory } = await import('./users/UsersDaoMemory.js');

        productsDao = new ProductsDaoMemory();
        cartsDao = new CartsDaoMemory();
        usersDao = new UsersDaoMemory();
        
        break;
}

/* ====================== MODULOS EXPORTADOS ======================== */
export { productsDao, cartsDao, usersDao };
