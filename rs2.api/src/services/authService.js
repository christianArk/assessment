import { UserService } from "./userService"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import 'dotenv/config'

const {JWT_SECRET, BCRYPT_SALT} = process.env

export class AuthService {
    constructor() {
        this.userService = new UserService()
    }

    login = async (data) => {
        try {
            let user = await this.userService.getUserByLoginName(data.loginName);
            if (!user) {
                throw "Incorrect Login name/password"
            }
            if(!bcrypt.compareSync(data.password, user.hashPassword))
            {
                throw "Incorrect Login name/password"
            }
            let userTokenObj = {
                id: user._id,
                username: user.loginName,
                exp: Math.floor(Date.now() / 100) + (60 * 60)
            }

            
            const response =  {
                                user: {
                                    username: user.loginName
                                },
                                token: this.generateToken(userTokenObj)
                              }
            return response;
        } catch (error) {
            throw error
        }
    }

    signup = async (data) => {
        try {
            if(await this.userService.getUserByLoginName(data.loginName)) throw "This username already exists"
            let user = await this.userService.createUser(data);
            if(user) {
                let userTokenObj = {
                    id: user._id,
                    username: user.loginName,
                    exp: Math.floor(Date.now() / 100) + (60 * 60)
                }
                const token = this.generateToken(userTokenObj)

                const response =  {
                    user: {
                        username: user.loginName
                    },
                    token: this.generateToken(userTokenObj)
                }
                return response;
            }
        } catch (error) {
            throw error
        }
        
    }

    generateToken = (obj) => {
        try {
            let token = jwt.sign(obj, JWT_SECRET)
            return token
        } catch (error) {
            return null
        }
    }
 
}