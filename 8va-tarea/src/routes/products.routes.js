import { Router } from "express"
import { ProductManager } from "../dao/models/productsManager.js"
import { passportError, authorization } from "../utils/messagesError.js";

const productRouter = Router();

productRouter.get('/', passportError('jwt'), authorization(['user','admin']), async (req, res) => {
    const { limit, page, category, sort } = req.query;

    try {
        const result = await ProductManager.findAll(limit, page, category, sort);

        const response = {
            status: "success",
            payload: result.docs, // Resultado de los productos solicitados
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `http://${req.headers.host}${req.baseUrl}?limit=${limit}&page=${result.prevPage}&category=${category}&sort=${sort}` : null,
            nextLink: result.hasNextPage ? `http://${req.headers.host}${req.baseUrl}?limit=${limit}&page=${result.nextPage}&category=${category}&sort=${sort}` : null
        };

        res.status(200).send(response);
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

productRouter.get('/:id', passportError('jwt'), authorization(['user','admin']), async (req, res) => {
    const {id} = req.params
    try {
        const product = await ProductManager.findById(id);
        if (product)
            res.status(200).send({respuesta: 'ok', mensaje: product})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'Product not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

productRouter.post('/',  passportError('jwt'), authorization('admin'), async (req, res) => {
    const {title, description, code, price, stock, category} = req.body
    try {
        const respuesta = await ProductManager.create({title, description, code, price, stock, category});
        res.status(200).send({respuesta: 'ok', mensaje: respuesta})
    } catch (error){
        res.status(400).send({respuesta: 'Error al crear producto', mensaje: error})
    }
})

productRouter.put('/:code',  passportError('jwt'), authorization('admin'), async (req, res) => {
    const { code } = req.params;
    console.log(code)
    const {title, description, price, status, stock, category} = req.body
    try {
        const product = await ProductManager.updateByCode({ code: code }, { title, description, price, code,  stock, category, status});
        if (product)
            res.status(200).send({respuesta: 'ok product updated', mensaje: product})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'Product not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error updating product', mensaje: error})
    }
})

productRouter.delete('/:id', passportError('jwt'), authorization('admin'), async (req, res) => {
    const {id} = req.params
    try {
        const product = await ProductManager.deleteById(id);
        if (product)
            res.status(200).send({respuesta: 'ok product deleted', mensaje: product})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'product not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

export default productRouter