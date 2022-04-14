import { ProductService } from "../services/productService"

const products = [
    {
        name: "Eloquent Javascript",
        type: "Books",
        description: "Learn Javascript",
    },
    {
        name: "Mumford and Sons",
        type: "Music",
        description: "Babel Album",
    },
    {
        name: "Game of thrones",
        type: "Games",
        description: "Game of thrones",
    },
]

export const seedProducts = async () => {
    const productService = new ProductService()
    // check if products table is empty
    let existingProducts = await productService.getAllProducts()
    if (existingProducts.length == 0)
    {
        productService.insertMany(products)
        console.log("Products seeded!")
    }
}