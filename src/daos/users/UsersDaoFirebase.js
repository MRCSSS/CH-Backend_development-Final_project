import ContFirebase from '../../containers/ContFirebase.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class UsersDaoFirebase extends ContFirebase {
    constructor() {
        super('users');
    }

}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default UsersDaoFirebase;
