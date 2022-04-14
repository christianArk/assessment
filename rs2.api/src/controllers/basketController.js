import { Response } from "../utils/response"

export class BasketController 
{
    constructor(basketService){
        this.basketService = new basketService
    }
    
    createBasket = async (req, res) => {
        try {
            await this.basketService.createBasket(req).then(data => {
                res.json(new Response("Basket created", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    updateBasket = async (req, res) => {
        try {
            await this.basketService.updateBasket(req.body).then(data => {
                res.json(new Response("Basket updated", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getAllBaskets = async (req, res) => {
        try {
            await this.basketService.getAllBaskets(req.user).then(data => {
                res.json(new Response("All Baskets", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getBasket = async (req, res) => {
        try {
            await this.basketService.getBasket(req.params.basketid).then(data => {
                res.json(new Response("Basket found", data));
            }).catch(err => {
                console.log(err)
                res.status(400).json(new Response(err, "", false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    deleteBasket = async (req, res) => {
        try {
            await this.basketService.deleteBasket(req.params.basketid).then(data => {
                res.json(new Response("Item successfully removed from basket"));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }
}