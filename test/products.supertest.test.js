import chai from 'chai';
import mongoose from 'mongoose';
import dotenv from 'dotenv';    
import supertest from 'supertest';

const expect = chai.expect;
dotenv.config();

let test_product_id = null;
let test_product_code = null;
let token = null;

const api = supertest('http://localhost:4000/api');

await mongoose.connect(process.env.MONGO_URL);

describe('test CRUD de las ruta /api/products', function () {

    before( () => {
        console.log('before the test')
    })

    describe('ruta api/products metodo post', function () {

        it('iniciar sesion con post a traves de /sessions/login', async function() { // Increase timeout here 
            this.timeout(5000); // Increase timeout to 5000ms
            const user = {
                email: 'marcoarraiztest@gmail.com',
                password: '123456'
            };
            const { statusCode, _body, ok} = await api.post('/sessions/login').send(user);
            token = _body.token;
            expect(statusCode).to.be.equal(200);
            expect(token).to.be.ok;
        });
        // testeo de la creacion de un producto
        it('crear un producto mediante post ', async function() { // Increase timeout here
            this.timeout(5000); // Increase timeout to 5000ms
            const newproduct = {
                title: 'RTX 3070',
                description: 'Tarjeta grafica Nvidia serie 3000',
                price: 500,
                stock: 10,
                code: 'G001',
                category: 'GPU'    
            };
            const { statusCode, _body, ok} = await api.post('/products').set('Authorization', `Bearer ${token}`).send(newproduct);
            test_product_id = _body._id;
            test_product_code = _body.code;
            expect(statusCode).to.be.equal(201);
            expect(_body).to.have.property('_id')
        });
        // testeo del update del producto creado
        it('actualizar producto mediante PUT en /products/:id', async function() { // Increase timeout here
            this.timeout(5000); // Increase timeout to 5000ms
            const product = {
                title: 'RTX 3070',
                description: 'Tarjeta grafica Nvidia serie 3000',
                price: 500,
                stock: 100,
                code: 'G001',
                category: 'GPU'    
            };
            const { statusCode, _body, ok} = await api.put(`/products/${test_product_code}`).set('Authorization', `Bearer ${token}`).send(product);
            expect(statusCode).to.be.equal(200);    
            expect(_body).to.have.property('stock').to.be.equal(1000);
        });
        //testeo de obtencion del producto creado
        it('obtener un producto por id', async function() { // Increase timeout here
            this.timeout(5000); // Increase timeout to 5000ms
            const { statusCode, _body, ok} = await api.get(`/products/${test_product_id}`).set('Authorization', `Bearer ${token}`);
            expect(statusCode).to.be.equal(200);
            expect(_body).to.have.property('_id')
            expect(_body).to.have.property('code').to.be.equal(test_product_code)
        });
        // testeo de obtencion de todos los productos
        it('obtener todsos los productos', async function() { // Increase timeout here
            this.timeout(5000); // Increase timeout to 5000ms
            const { statusCode, _body, ok} = await api.get('/products').set('Authorization', `Bearer ${token}`);
            expect(statusCode).to.be.equal(200);
            expect(_body).not.to.be.deep.equal([])
        });
        // testeo de la eliminacion del producto creado
        it('Eliminar el producto creado con DELETE en /products/:id', async function() { // Increase timeout here
            this.timeout(5000); // Increase timeout to 5000ms
            const { statusCode, _body, ok} = await api.delete(`/products/${test_product_id}`).set('Authorization', `Bearer ${token}`);
            expect(statusCode).to.be.equal(200);
        })

    });
});