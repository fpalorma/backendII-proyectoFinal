import fs from "node:fs"
import path from "node:path"
import { productModel } from "../../dao/mongo/models/product.model.js";
console.log("Script iniciado.");
export const addSeedProducts = async ()=>{
    try {
        
        console.log("Ya estamos por leer el archivo");
        const dataPath = path.resolve("src/seed/data/products.json");
        const data = fs.readFileSync(dataPath, "utf-8");
        console.log("Archivo JSON leído:", data);
        const products = JSON.parse(data)
        console.log(products);
        
        await productModel.insertMany(products)    
        console.log("Productos cargados exitosamente");
        
    } catch (error) {
        console.error("Error al insertar productos:", error);
    }
}
addSeedProducts()
