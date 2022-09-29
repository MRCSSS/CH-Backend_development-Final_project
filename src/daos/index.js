let productsDao;
let cartsDao;

switch (process.env.DB_TYPE) {
    case 'json':
        const { default: ProductsDaoFile } = await import('./products/ProductsDaoFile.js');
        const { default: CartsDaoFile } = await import('./carts/CartsDaoFile.js');

        productsDao = new ProductsDaoFile();
        cartsDao = new CartsDaoFile();
        
        break;

    case 'firebase':
        const { default: ProductsDaoFirebase } = await import('./products/ProductsDaoFirebase.js');
        const { default: CartsDaoFirebase } = await import('./carts/CartsDaoFirebase.js');

        productsDao = new ProductsDaoFirebase();
        cartsDao = new CartsDaoFirebase();
        
        break;

    // case 'mariadb':
    //     const { default: ProductsDaoMariaDB } = await import('./products/ProductsDaoMariaDB.js');
    //     const { default: CartsDaoMariaDB } = await import('./carts/CartsDaoMariaDB.js');

    //     productsDao = new ProductsDaoMariaDB();
    //     cartsDao = new CartsDaoMariaDB();
        
    //     break;

    case 'mongodb':
        const { default: ProductsDaoMongoDB } = await import('./products/ProductsDaoMongoDB.js');
        const { default: CartsDaoMongoDB } = await import('./carts/CartsDaoMongoDB.js');

        productsDao = new ProductsDaoMongoDB();
        cartsDao = new CartsDaoMongoDB();
        
        break;

    // case 'sqlite3':
    //     const { default: ProductsDaoSqlite3 } = await import('./products/ProductsDaoSqlite3.js');
    //     const { default: CartsDaoSqlite3 } = await import('./carts/CartsDaoSqlite3.js');

    //     productsDao = new ProductsDaoSqlite3();
    //     cartsDao = new CartsDaoSqlite3();
        
    //     break;

    default:
        const { default: ProductsDaoMemory } = await import('./products/ProductsDaoMemory.js');
        const { default: CartsDaoMemory } = await import('./carts/CartsDaoMemory.js');

        productsDao = new ProductsDaoMemory();
        cartsDao = new CartsDaoMemory();
        
        break;

}

export { productsDao, cartsDao };
