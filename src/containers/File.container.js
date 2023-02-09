/* =================================== MODULES =================================== */
import Container from '../classes/Container.class.js';
import CustomError from '../../classes/CustomError.class.js';
import { promises as fs } from 'fs'
/* ================================== CONTAINER ================================== */
class FileContainer extends Container {
    constructor() {
        super();
    }

    async getAll() {
        let allObjs = null;
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8');
            allObjs = JSON.parse(objs);
        } catch (error) {
            allObjs = [];
            throw new CustomError({customCode:500,customName:'FileContainer: getAll()',customMsg:error.message});
        } finally {
            return allObjs;
        }
    }

    async getById(id) {
        let obj = null;
        const objects = await this.getAll();
        try {
            obj = objects.find(obj => obj.id == id);
            if ( obj.length === 0 ) {
                throw new CustomError({customCode:404,customName:'FileContainer: getById(id)',customMsg:`Object not found, id: ${id}.`});
            }
        } catch (error) {
            throw new CustomError({customCode:404,customName:'FileContainer: getById(id)',customMsg:error.message});
        } finally {
            return obj;
        }
    }

    async add(obj) {
        const objs = await this.getAll();
        try {
            const index = this.collection.findIndex( object => object.id == id);
            if (index == -1) {
                let newID;
                if (objs.length === 0) {
                    newID = 1;
                } else {
                    newID = objs[objs.length-1].id+1;
                }
                const newObj = { ...obj, id:newID };
                objs.push(newObj);
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
                return newID;
            } else {
                throw new CustomError({customCode:500,customName:'FileContainer: add(obj)',customMsg:`Object exists!!!`});
            }
        } catch (error) {
            throw new CustomError({customCode:500,customName:'FileContainer: add(obj)',customMsg:error.message});
        }
    }
        
    async deleteById(id) {
        const objs = await this.getAll();
        const index = objs.findIndex(o => o.id == id);
        if (index == -1) {
            throw new CustomError({customCode:404,customName:'FileContainer: deleteById(id)',customMsg:`Object not found, id: ${id}.`});
        }
        objs.splice(index, 1);
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
        } catch (error) {
            throw new CustomError({customCode:404,customName:'FileContainer: deleteById(id)',customMsg:error.message});
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2));
        } catch (error) {
            throw new CustomError({customCode:500,customName:'FileContainer: deleteAll()',customMsg:error.message});
        }
    }

    async update(id, obj) {
        const objs = await this.getAll();
        const index = objs.findIndex(o => o.id == elem.id);
        if (index == -1) {
            throw new CustomError({customCode:404,customName:'FileContainer: update(obj, id)',customMsg:`Object not found, id: ${id}.`});
        } else {
            const beforeObj = objs[index];
            objs[index] = obj;
            try {
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
                return {before: beforeObj, after: obj};
            } catch (error) {
                throw new CustomError({customCode:404,customName:'FileContainer: update(obj, id)',customMsg:error.message});
            }
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default FileContainer;