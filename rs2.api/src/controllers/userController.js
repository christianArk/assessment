import { Response } from "../utils/response"

export class UserController 
{
    constructor(userService)
    {
        this.userService = new userService
    }

    createUser = async (req, res) => {
        try {
            await this.userService.createUser(req.body).then(data => {
                data.hashPassword = undefined
                res.json(new Response("User created", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    updateUser = async (req, res) => {
        try {
            await this.userService.updateUser(req.body).then(data => {
                res.json(new Response("User updated", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getAllUsers = async (req, res) => {
        try {
            await this.userService.getAllUsers().then(data => {
                res.json(new Response("All users", data));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    getUser = async (req, res) => {
        try {
            await this.userService.getUser(req.params.userid).then(data => {
                res.json(new Response("User found", data));
            }).catch(err => {
                console.log(err)
                res.status(400).json(new Response(err, "", false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }

    deleteUser = async (req, res) => {
        try {
            await this.userService.deleteUser(req.params.userid).then(data => {
                res.json(new Response("User deleted"));
            }).catch(err => {
                res.status(400).json(new Response("An error occured!", err, false));
            })
        } catch (error) {
            res.status(500).json(new Response("System glitch!", error, false));
        }
    }
}