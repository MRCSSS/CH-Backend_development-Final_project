/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import admin from 'firebase-admin';
import { config } from '../utils/config.js';
import moment from 'moment';

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

const firebaseDB = admin.firestore();

/* ------------------------ CLASE CONTENEDOR ------------------------ */
class ContFirebase {
    constructor(collectionName) {
        this.collection = firebaseDB.collection(collectionName);
    }

    async getAll() {
        try {
            const objects = []
            const snapshot = await this.collection.get();

            snapshot.forEach(doc => {
                objects.push({ id: doc.id, ...doc.data() })
            })

            return objects;
        } catch (error) {
            throw new Error(`getAll() error: ${error}`);
        }
    }

    async getById(id) {
        try {
            const doc = await this.collection.doc(id).get();

            if ( doc.exists ) {
                return { ...doc.data(), id: id }
            } else {
                throw new Error(`getById(id) error: doc not found`);
            }
        } catch (error) {
            throw new Error(`getById(id) error: ${error}`);
        }
    }

    async save(obj) {
        try {
            const saved = await this.collection.add({ ...obj, timestamp: moment().format('DD/MM/YY HH:mm:ss') });
            return saved.id;
        } catch (error) {
            throw new Error(`save(obj) error: ${error}`);
        }
    }
        
    async deleteById(id) {
        try {
            const doc = await this.collection.doc(id).get();

            if ( doc.exists ) {
                await this.collection.doc(id).delete();
            } else {
                throw new Error(`deleteById(id) error: doc not found`);
            }
        } catch (error) {
            throw new Error(`deleteById(id) error: ${error}`);
        }
    }

    // async deleteAll() {
    //     try {

    //     } catch (error) {
    //         console.log('deleteAll(): ', error);
    //     }
    // }

    async update(prod, id) {
        try {
            const doc = await this.collection.doc(id).get();
            
            if ( doc.exists ) {
                let docRef = this.collection.doc(`${id}`);
                await docRef.update({ ...prod });
                let docAfter = await this.collection.doc(id).get();

                return { msg: 'Updated!', data: { 'before': doc.data(), 'after': docAfter.data() } }
            } else {
                throw new Error(`update(prod, id) error: doc not found`);
            }
        } catch (error) {
            throw new Error(`update(prod, id) error: ${error}`);
        }
    }
}

/* ---------------------- MODULOS EXPORTADOS ------------------------ */
export default ContFirebase;