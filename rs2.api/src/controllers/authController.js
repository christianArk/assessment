import { Response } from "../utils/response"

export class AuthController {
    constructor(authService) {
        this.authService = new authService
    }

    login = async (req, res) => {
        try {
            await this.authService.login(req.body).then(data => {
                res.send(new Response("Login successful", data))
            }).catch(err => {
                res.status(400).send(new Response("Login unsuccessful", err, false))
            })
        } catch (error) {
            res.status(500).send(new Response("System glitch!", error))
        }
    }

    signup = async (req, res) => {
        try {
            await this.authService.signup(req.body).then(data => {
                res.send(new Response("Signup successful", data))
            }).catch(err => {
                res.status(400).send(new Response("Signup unsuccessful", err, false))
            })
        } catch (error) {
            res.status(500).send(new Response("System glitch!", error))
        }
    }

    sendRecoveryToken = async (req, res) => {
        try {
            await this.authService.sendRecoveryToken(req.body).then(data => {
                res.send(new Response("Token successfully sent", data))
            }).catch(err => {
                res.status(400).send(new Response("Token not sent", err, false))
            })
        } catch (error) {
            res.status(500).send(new Response("System glitch!", error))
        }
    }

    changePassword = async (req, res) => {
        try {
            await this.authService.changePassword(req.body).then(data => {
                res.send(new Response("Password successfully updated", null))
            }).catch(err => {
                res.status(400).send(new Response("Password update failed", err, false))
            })
        } catch (error) {
            res.status(500).send(new Response("System glitch!", error))
        }
    }
}