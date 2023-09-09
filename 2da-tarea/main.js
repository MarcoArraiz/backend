import Product from "./class/Product.js";
import ProductManager from "./class/ProductManager.js";

const pManager = new ProductManager();

const productoNuevo1 = new Product(
    "Nvidia RTX 4060",
    "GPU de Nvidia Serie RTX 4000",
    600,
    "/ruta-imagen1.jpg",
    "GPU001",
    10
);
const productoNuevo2 = new Product(
    "Nvidia RTX 4070",
    "GPU de Nvidia Serie RTX 4000",
    700,
    "/ruta-imagen2.jpg",
    "GPU004",
    5
);
const productoNuevo3 = new Product(
    "Nvidia RTX 4080",
    "GPU de Nvidia Serie RTX 4000",
    900,
    "/ruta-imagen2.jpg",
    "GPU003",
    5
);
const productoNuevo4 = new Product(
    "Nvidia RTX 4090",
    "GPU de Nvidia Serie RTX 4000",
    1200,
    "/ruta-imagen2.jpg",
    "GPU004",
    5
);

pManager.addProduct(productoNuevo1);
pManager.addProduct(productoNuevo4);