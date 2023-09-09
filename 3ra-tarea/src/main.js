import express from "express";
import ProductManager from "./Class/ProductManager.js";
import Product from "./Class/Product.js";

const pManager = new ProductManager();

const PORT = 4005;

const app = express();

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

app.get("/products/:pid", async (req, res) => {
  console.log(req.params.pid);

  const allProducts = await pManager.getProducts();
  const filtroProducts = allProducts.find(
    (prod) => prod.id === parseInt(req.params.pid)
  );

  if (filtroProducts) {
    res.send(filtroProducts);
  } else {
    res.send("Producto no existe en Stock");
  }
});

app.get("/products", async (req, res) => {
  const { price, stock, limit } = req.query;

  const allProducts = await pManager.getProducts();

  let filtroVariosProductos = allProducts;

  if (price) {
    filtroVariosProductos = filtroVariosProductos.filter(
      (prod) => parseFloat(prod.price) === parseFloat(price)
    );
  }

  if (stock) {
    filtroVariosProductos = filtroVariosProductos.filter(
      (prod) => parseFloat(prod.stock) === parseInt(stock)
    );
  }

  if (limit && !isNaN(limit) && parseInt(limit) > 0) {
    const limiteProductos = filtroVariosProductos.slice(0, parseInt(limit));
    res.send(limiteProductos);
  } else {
    res.send(filtroVariosProductos);
  }
});

