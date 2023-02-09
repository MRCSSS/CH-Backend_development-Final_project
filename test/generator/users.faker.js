/* =================================== MODULES =================================== */
import { faker } from '@faker-js/faker';
import FormData from 'form-data';
import * as fs from 'fs';

/* ================================== INSTANCES ================================== */
faker.locale = 'es';
/* ================================== FUNCTIONS ================================== */
/* ==================================== FAKER ==================================== */
class usersFak {
    getUser = async () => {
        return {
            name: faker.name.firstName(),
            username: faker.internet.email(),
            address: faker.helpers.arrayElement(['here', 'there']),
            age: faker.datatype.number({ min: 1, max: 150, precision: 1}),
            password: 12345678,
            phone: faker.phone.number('55########'),
        }
    }

    getUpdate = async () => {
        return {
            address: faker.helpers.arrayElement(['here', 'there']),
            age: faker.datatype.number({ min: 1, max: 150, precision: 1}),
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default usersFak;