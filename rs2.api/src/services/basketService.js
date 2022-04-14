import "dotenv/config"
import { BasketModel } from "../models/basketModel"
import mongoose from "mongoose"
import { ProductService } from "./productService";

const basketModel = mongoose.model('Basket', new BasketModel);
const productService = new ProductService();

export class BasketService {
    constructor(){
    }
    
    createBasket = async (req) => {
        try {
            let product = await productService.getProductByName(req.body.product)
            
            let payload = {
                product: product._id,
                user: req.user.id,
                quantity: req.body.quantity
            }
            let basket = basketModel(payload);
            await basket.save();
            return await this.getBasket(basket.id)
        } catch (error) {
            throw error;
        }
    }

    updateBasket = async (data) => {
        try {
            let basket = await basketModel.findByIdAndUpdate(data._id, {$set: data}, {new: true});
            return basket;
        } catch (error) {
            throw error;
        }
    }

    getAllBaskets = async (currentUser) => {
        try {
            return await basketModel.find({user: currentUser.id})
                        .populate('user', ['_id', 'loginName'])
                        .populate('product', ['_id', 'name', 'type']);
        } catch (error) {
            throw error;
        }
    }

    getBasket = async (basketId) => {
        try {
            let basket = await basketModel.findById(basketId)
                        .populate('user', ['_id', 'loginName'])
                        .populate('product', ['_id', 'name', 'type']);
            if(basket)
            {
                return basket
            }
            throw "Basket not found!";
        } catch (error) {
            throw error;
        }
    }

    deleteBasket = async (basketId) => {
        try {
            return await basketModel.findByIdAndDelete(basketId);
        } catch (error) {
            throw error;
        }
    }

    hasUserAddedProduct = async (productName, userId) => {
        try {
            let product = await productService.getProductByName(productName)
            let item = await basketModel.findOne({product: product._id, user: userId});
            if(item)
            {
                return true
            }
            return false
        } catch (error) {
            throw error;
        }
    }
    
}