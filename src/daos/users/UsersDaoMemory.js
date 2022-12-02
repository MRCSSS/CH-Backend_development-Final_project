import ContMemory from '../../containers/ContMemory.js';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class UsersDaoMemory extends ContMemory {
    constructor() {
        super('users');
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default UsersDaoMemory;