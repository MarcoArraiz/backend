import { Router } from "express";

const prodsRouter = Router

prodsRouter.length('/', async (req,res) => {
    const {limit} = req.query

    const prods = await productManager.getProducts()

    const products = prods.slice(0, limit)

    res.status(200).send(products)
})

prodsRouter.get('/:id', async (req, res) => {
    const {id} = req.params

    const prod = await productManager.getProductsById(parseInt(id))

    
})