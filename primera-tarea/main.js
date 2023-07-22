class ProductManager {
    constructor() {
        this.products = [];
        this.nextProductId = 1;
    }

    addProduct(product) {
        // Validacion de datos obligatorios
        if (!product.code || !product.name || !product.price || !product.description || !product.img || product.stock === undefined) {
            console.log("Error: Todos los campos son obligatorios.");
            return;
        }

        // Validamos que no se repita el campo "code"
        if (this.products.some((p) => p.code === product.code)) {
            console.log("Error: El código del producto ya existe.");
            return;
        }

        // Agregamos el producto al array de productos
        product.id = this.nextProductId++;
        this.products.push(product);
        console.log("Producto agregado:", product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            console.log("Error: Producto no encontrado.");
        }
        return product;
    }
}


const productManager = new ProductManager();

productManager.addProduct({
    code: "1234",
    name: "Producto 1",
    price: 19.99,
    description: "Descripción del producto 1",
    img: "ruta/imagen1.jpg",
    stock: 10,
});

productManager.addProduct({
    code: "5678",
    name: "Producto 2",
    price: 29.99,
    description: "Descripción del producto 2",
    img: "ruta/imagen2.jpg",
    stock: 5,
});

const allProducts = productManager.getProducts();
console.log("Todos los productos:", allProducts);

const productById = productManager.getProductById(2);
console.log("Producto con ID 2:", productById);

const productByIdNotFound = productManager.getProductById(100);
console.log("Producto con ID 100:", productByIdNotFound);