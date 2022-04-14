import { Response } from "../utils/response"

export class ProductController 
{
    constructor(productService){
        this.productService = new productService
    }
    
    createProduct = async (req, res) => {
        try {
            await this.productService.createProduct(req.body).then(data => {
                res.json(new Response("Product created", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    updateProduct = async (req, res) => {
        try {
            await this.productService.updateProduct(req.body).then(data => {
                res.json(new Response("Product updated", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getAllProducts = async (req, res) => {
        try {
            await this.productService.getAllProducts().then(data => {
                res.json(new Response("All Products", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getProduct = async (req, res) => {
        try {
            await this.productService.getProduct(req.params.productid).then(data => {
                res.json(new Response("Product found", data));
            }).catch(err => {
                console.log(err)
                res.status(400).json(new Response(err, "", false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    deleteProduct = async (req, res) => {
        try {
            await this.productService.deleteProduct(req.params.productid).then(data => {
                res.json(new Response("Product deleted"));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getProductTypes = async (req, res) => {
        try {
            await this.productService.getProductTypes().then(data => {
                res.json(new Response("All Products types", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }
}