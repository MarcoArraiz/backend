import { Router } from "express"
import { CartManager } from "../dao/models/cartManager.js"

const cartRouter = Router()

cartRouter.get('/', async (req, res) => {
    const {limit} = req.query
    try {
        const carts = await CartManager.findAll(limit);
        res.status(200).send({respuesta: 'ok', mensaje: carts})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

cartRouter.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const cart = await CartManager.findById(id);
        if (cart)
            res.status(200).send({respuesta: 'ok', mensaje: cart})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'Product not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error getting cart by id', mensaje: error})
    }
})

cartRouter.post('/', async (req, res) => {
    try {
        const respuesta = await CartManager.create();
        res.status(200).send({respuesta: 'OK cart created', mensaje: respuesta})
    } catch (error){
        res.status(400).send({respuesta: 'Error at cart creation', mensaje: error})
    }
})

cartRouter.post('/:cid/products/:pid', async (req, res) =>{
    const {cid, pid} = req.params
    const {quantity} = req.body
    
    try {
        await CartManager.addOrUpdateProductInCart(cid, pid, quantity);
        res.status(200).send({ respuesta: 'OK', mensaje: 'Cart Updated' });
    } catch (error) {
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message });
    }

})

export default cartRouter;