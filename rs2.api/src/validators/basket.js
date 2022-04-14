import { body } from "express-validator"
import { BasketService } from "../services/basketService"
import { ProductService } from "../services/productService"

let basketService = new BasketService();
let productService = new ProductService();

export const createBasketValidation = [
    body('product').notEmpty()
                    .withMessage('Product name is required').bail()
                    .custom(async (val, {req}) => {
                        let product = await productService.getProductByNameAndType(val, req.body.type);
                        if(!product)
                            throw new Error('This product does not exist')
                    }).bail()
                    .custom(async (val, {req}) => {
                        if(await basketService.hasUserAddedProduct(val, req.user.id))
                            throw new Error('You have already bought this product')
                    }),
    body('quantity').notEmpty()
                    .withMessage('Quantity is required').bail()
                    .isInt({min: 1}).withMessage('Quantity must be greater than zero'),
]