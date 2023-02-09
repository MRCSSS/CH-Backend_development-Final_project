/* =================================== MODULES =================================== */
import mongoose from 'mongoose';
import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app.js';
import usersFak from './generator/users.faker.js';
import process from 'process';
import * as path from 'path';
import {createServer} from 'http';
import config from '../src/config/config.js';
/* ================================== INSTANCES ================================== */
const httpServer = createServer(app);
const port = normalizePort(config.port || '3000');

const userGenerator = new usersFak();
let request;
let server;
let user;
let userId;
/* ================================== FUNCTIONS ================================== */
function normalizePort(val) {           // Normalize a port into a number, string, or false.
    const port = parseInt(val, 10);

    if (isNaN(port)) { return val; }
    if (port >= 0) { return port; }

    return false;
}

async function startServer() {
    return new Promise((resolve, reject) => {
        const server = httpServer.listen(port, () => {
            console.log(`   Server listening at PORT: ${port}`);
            resolve(server)
        });
        server.on('error', error => {
            console.log(`   Server error: ${error}`)
            reject(error)
        });
    })
}

async function connectDB() {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect('mongodb+srv://admin:adminpw@cluster0.vfrm3.mongodb.net/ecommerce?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('   Data base connected!!');
    } catch (error) {
        throw new Error(`   Data base connection error: ${err}`)
    }
}

/* ==================================== TESTS ==================================== */
describe('API REST FULL test using EXPECT interface from CHAI module: ', () => {
    before(async () => {
        // await connectDB();
        server = await startServer();
    })

    after(async () => {
        await mongoose.disconnect()
        await server.close()
    })

    // describe('Check carts functions: ', () => {
    //     before(async function () {
    //         request = supertest(`http://localhost:${server.address().port}/apiV1/cart`);
    //     })

    //     it("Check createCart request. It must return .", async () => {
    //         const res = await request.post(`/`).send(product);
    //         expect(res.status).to.eql(200);
    //     })

    //     it("Check getAllCarts request. It must return .", async () => {
    //         const res = await request.get(`/`);
    //         expect(res.status).to.eql(200);
    //     })

    //     it("Check deleteCart request. It must return .", async () => {
    //         const res = await request.delete(`/${productId}`)
    //         expect(res.status).to.eql(200)
    //     })

    //     it("Check getCartProducts request. It must return .", async () => {
    //         const res = await request.get(`/`)
    //         expect(res.status).to.eql(200)
    //     })

    //     it("Check updateCartProducts request. It must return .", async () => {
    //         const res = await request.get(`/`)
    //         expect(res.status).to.eql(200)
    //     })

    //     it("Check deleteCartProduct request. It must return .", async () => {
    //         const res = await request.get(`/`)
    //         expect(res.status).to.eql(200)
    //     })
    // })
    
    // describe('Check products functions: ', () => {
    //     before(async function () {
    //         request = supertest(`http://localhost:${server.address().port}/apiV1/products`);
    //     })

    //     it("Check getAllProducts request. It must return .", async () => {
    //         const res = await request.get(`/`)
    //         expect(res.status).to.eql(200)
    //     })

    //     it("Check deleteAllProducts request. It must return .", async () => {
    //         const res = await request.get(`/`)
    //         expect(res.status).to.eql(200)
    //     })

    //     it("Check addProduct request. It must return .", async () => {
    //         const res = await request.get(`/`)
    //         expect(res.status).to.eql(200)
    //     })

    //     it("Check getProduct request. It must return .", async () => {
    //         const res = await request.get(`/`)
    //         expect(res.status).to.eql(200)
    //     })

    //     it("Check updateProduct request. It must return .", async () => {
    //         const res = await request.get(`/`)
    //         expect(res.status).to.eql(200)
    //     })

    //     it("Check deleteProduct request. It must return .", async () => {
    //         const res = await request.get(`/`)
    //         expect(res.status).to.eql(200)
    //     })
    // })

    describe('Check USERS functions: ', () => {
        before(async () => {
            user = await userGenerator.getUser();
            request = supertest(`http://localhost:${server.address().port}/apiV1/user`);
        })

        it("Check register request. It must register a user and return the new user ID.", async () => {
            const res = await request.post('/register')
                .field('name', user.name)
                .field('username', user.username)
                .field('address', user.address)
                .field('age', user.age)
                .field('password', user.password)
                .field('phone', user.phone)
                .attach('userImg', path.join(process.cwd(), '/test/img', 'avatar_test.png'));

            userId = res.body.userID;

            expect(res.status).to.eql(201);
            expect(res.body).to.include.keys('method', 'message', 'userID')
            expect(res.body.method).to.eql('register');
            expect(res.body.message).to.eql('User registered successfully!!!');
            expect(res.body.userID).to.be.a('string');
        })

        // it("Check login request. It must return .", async () => {
        //     const res = await request.get(`/`)
        //     expect(res.status).to.eql(200)
        // })

        // it("Check logout request. It must return .", async () => {
        //     const res = await request.get(`/`)
        //     expect(res.status).to.eql(200)
        // })

        it(`Check getUser request. It must return the user with a specific ID.`, async () => {
            const res = await request.get(`/${userId}`);

            expect(res.status).to.eql(200);
            expect(res.body).to.include.keys('method', 'message', 'data')
            expect(res.body.method).to.eql('getUser');
            expect(res.body.message).to.eql('User found!!!');
            expect(res.body.data).to.include.keys('id', 'name', 'username', 'address', 'age', 'phone', 'userImg', 'timestamp')
            expect(res.body.data.id).to.be.a('string');
            expect(res.body.data.name).to.eql(user.name);
            expect(res.body.data.username).to.eql(user.username);
            expect(res.body.data.address).to.eql(user.address);
            expect(res.body.data.age).to.eql(user.age);
            expect(res.body.data.phone).to.eql(user.phone);
            expect(res.body.data.userImg).to.be.a('string');
            expect(res.body.data.timestamp).to.be.a('string');
        })

        it("Check updateUser request. It must update a user with a specific ID and return a message of confirmation.", async () => {
            const userUpdate = userGenerator.getUpdate();
            const res = await request.put(`/${userId}`).send(userUpdate);

            expect(res.status).to.eql(200);
            expect(res.body).to.include.keys('method', 'message')
            expect(res.body.method).to.eql('updateUser');
            expect(res.body.message).to.eql(`User with ID '${userId}' updated!!!`);
        })

        it("Check deleteUser request. It must delete a user with a specific ID and return a message of confirmation.", async () => {
            const res = await request.delete(`/${userId}`);

            expect(res.status).to.eql(200);
            expect(res.body).to.include.keys('method', 'message')
            expect(res.body.method).to.eql('deleteUser');
            expect(res.body.message).to.eql(`User with ID '${userId}' deleted!!!`);
        })

        it("Check getAllUsers request. It must return a list of all users registered.", async () => {
            const res = await request.get(`/`);

            expect(res.status).to.eql(200);
            expect(res.body).to.include.keys('method', 'users')
            expect(res.body.method).to.eql('getAllUsers');
            expect(res.body.users).to.be.a('array');
        })

        it("Check deleteAllUsers request. It must delete all users and return a message of confirmation.", async () => {
            const res = await request.delete(`/`);

            expect(res.status).to.eql(200);
            expect(res.body).to.include.keys('method', 'message')
            expect(res.body.method).to.eql('deleteAllUsers');
            expect(res.body.message).to.eql('All users deleted!!!');
        })
    })
})
