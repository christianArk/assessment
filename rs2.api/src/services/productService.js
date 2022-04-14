import "dotenv/config"
import { ProductModel } from "../models/productModel"
import mongoose from "mongoose"

const productModel = mongoose.model('Product', new ProductModel);
export class ProductService {
    constructor(){
    }

    insertMany = async (data) => {
        try {
            return productModel.insertMany(data)
        } catch (error) {
            throw error;
        }
    }
    
    createProduct = async (data) => {
        try {
            let product = productModel(data);
            return product.save();
        } catch (error) {
            throw error;
        }
    }

    updateProduct = async (data) => {
        try {
            let product = await productModel.findByIdAndUpdate(data._id, {$set: data}, {new: true});
            return product;
        } catch (error) {
            throw error;
        }
    }

    getAllProducts = async () => {
        try {
            return await productModel.find({});
        } catch (error) {
            throw error;
        }
    }

    getProductTypes = async (productId) => {
        try {
            const types = [
                "Books",
                "Music",
                "Games"
            ]
            return types
        } catch (error) {
            throw error;
        }
    }

    getProduct = async (productId) => {
        try {
            let product = await productModel.findById(productId);
            if(product)
            {
                return product
            }
            return null
        } catch (error) {
            throw error;
        }
    }

    getProductByName = async (productName) => {
        try {
            let product = await productModel.findOne({name: {'$regex': productName, $options:'i'}});
            if(product)
            {
                return product
            }
            return null
        } catch (error) {
            throw error;
        }
    }

    getProductByNameAndType = async (productName, type) => {
        try {
            let product = await productModel.findOne({name: {'$regex': productName, $options:'i'}, type: type});
            if(product)
            {
                return product
            }
            return null
        } catch (error) {
            throw error;
        }
    }

    deleteProduct = async (productId) => {
        try {
            return await productModel.findByIdAndDelete(productId);
        } catch (error) {
            throw error;
        }
    }
    
}