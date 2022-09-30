/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import { promises as fs } from 'fs';
import moment from 'moment';

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class ContMemory {
    constructor(containerType, container) {
        this.contType = containerType;
        this.container = container;
    }

    async getAll() {
        contType = this.contType;
        
        return this.contType;
    }

    async getById(id) {
        const objects = await this.getAll();
        const foundObj = objects.find(obj => obj.id == id)

        return foundObj != '' ? foundObj : {'Error': `Could not find the product "id: ${id}"`}
    }

    async save(prod) {
        console.log(prod)

        const prods = await this.getAll();
        let newID;

        if (prods.length === 0) {
            newID = 1;
        } else {
            newID = prods[prods.length-1].id+1;
        }

        const newObj = { ...prod, timestamp: moment().format('DD/MM/YY HH:mm:ss'), id:newID };
        prods.push(newObj);


        try {
            await fs.writeFile(this.path, JSON.stringify(prods, null, 2));
            return newID;
        } catch (error) {
            throw new Error({error:'Error al guardar: ', description: error})
        }
    }
        
    async deleteById(id) {
        try {
            const objects = await this.getAll();
            const filteredObj = objects.filter(obj => obj.id != id);
            filteredObj !== '' ? await fs.writeFile(this.path, JSON.stringify(filteredObj, null, 2)) : console.log('deleteById(id): ', 'id doesn\'t found.');
        } catch (error) {
            console.log('deleteById(id): ', error);
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.path, JSON.stringify([], null, 2))
        } catch (error) {
            console.log('deleteAll(): ', error);
        }
    }

    async update(prod, id) {
        const products = await this.getAll();
        const filteredObj = products.filter(prod => prod.id == id);

        if ( filteredObj ) {
            const prodUpdated = { ...prod, timestamp: moment().format('DD/MM/YY HH:mm:ss'), id: id }
            const updated = products.map(prod => prod.id == id ? prodUpdated : prod)
            
            try {
                await fs.writeFile(this.path, JSON.stringify(updated, null, 2))
                return { msg: 'Updated!', data: { 'before': filteredObj, 'after': prodUpdated } }
            } catch (error) {
                throw new Error({ error:'Update error: ', description: error })
            }
    
        } else {
            return { msg:'Update error', description:'producto no encontrado' };
        }
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default ContMemory;