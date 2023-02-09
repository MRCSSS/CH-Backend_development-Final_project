/* =================================== MODULES =================================== */
import Container from '../classes/Container.class.js';
import CustomError from '../classes/CustomError.class.js';
/* ================================== CONTAINER ================================== */
class MemoryContainer extends Container {
    constructor(){
        super();
        this.collection = [];
    }

    async getAll() {
        let allObjs = null;
        try {
            const objs = this.collection;
            allObjs = objs;
        } catch (error) {
            allObjs = [];
            throw new CustomError({customCode:500,customName:'MemoryContainer: getAll()',customMsg:error.message});
        } finally {
            return allObjs;
        }
    }

    async getById(id) {
        let obj = null;
        const objects = await this.getAll();
        try {
            obj = objects.find(obj => obj.id == id);
            if ( obj.length != 0 ) {
                return obj;
            } else {
                throw new CustomError({customCode:404,customName:'MemoryContainer: getById(id)',customMsg:`Object not found, id: ${id}.`});
            }
        } catch (error) {
            throw new CustomError({customCode:404,customName:'MemoryContainer: getById(id)',customMsg:error.message});
        }
    }

    async add(obj) {
        try {
            let newObj = '';
            let newId = '';
            const index = this.collection.findIndex( object => object.id == id);
            if (index == -1) {
                if (this.collection.length == 0) {
                    newId = 1
                } else {
                    newId = this.collection[this.collection.length - 1].id + 1
                }
                newObj = {...obj, id: newId};
                this.collection.push(newObj);
                return newId;
            }
        } catch (error) {
            throw new CustomError({customCode:500,customName:'MemoryContainer: add(obj)',customMsg:error.message});
        }
    }

    async deleteById(id) {
        try {
            const index = this.collection.findIndex( object => object.id == id);
            if (index == -1) {
                throw new CustomError({customCode:404,customName:'MemoryContainer: deleteById(id)',customMsg:`Object not found, id: ${id}.`});
            } else {
                this.collection.splice(index, 1);
            }
        } catch (error) {
            throw new CustomError({customCode:404,customName:'MemoryContainer: deleteById(id)',customMsg:error.message});
        }
    }

    async deleteAll() {
        try {
            this.collection = [];
        } catch (error) {
            throw new CustomError({customCode:500,customName:'MemoryContainer: deleteAll()',customMsg:error.message});
        }
    }

    async update(id, obj) {
        try {
            const index = this.collection.findIndex( object => object.id == elemento.id);
            if (index == -1) {
                throw new CustomError({customCode:404,customName:'MemoryContainer: update(obj, id)',customMsg:`Object not found, id: ${id}.`});
            } else {
                const nObj = this.collection[index];
                const bObj = nObj;
                for (let x in obj) {
                    nObj[x] = obj[x];
                  }
                this.collection[index] = nObj;
                return {before: bObj, after: nObj};
            }
        } catch (error) {
            throw new CustomError({customCode:404,customName:'MemoryContainer: update(obj, id)',customMsg:error.message});
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default MemoryContainer;