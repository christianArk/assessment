import { UserModel } from "../models/userModel"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import "dotenv/config"

const {BCRYPT_SALT} = process.env
const userModel = mongoose.model('User', new UserModel);

export class UserService {
    constructor(){
    }

    createUser = async (data) => {
        try {
            if(await this.getUserByLoginName(data.loginName)) {
                throw "This login name already exists"
            }
            let user = userModel(data);
            user.hashPassword = bcrypt.hashSync(data.password, parseInt(BCRYPT_SALT));
            return user.save();
        } catch (error) {
            throw error;
        }
    }

    updateUser = async (data) => {
        try {
            let user = await this.user.findByIdAndUpdate(data._id, {$set: data}, {new: true}).select("-hashPassword");
            return user;
        } catch (error) {
            throw error;
        }
    }

    getAllUsers = async () => {
        try {
            return await userModel.find({}, {hashPassword: 0, __v: 0});
        } catch (error) {
            throw error;
        }
    }

    getUser = async (userId) => {
        try {
            let user = await userModel.findById(userId, {hashPassword: 0, __v: 0});
            if(user)
            {
                return user
            }
            throw "User not found!";
        } catch (error) {
            throw error;
        }
    }

    deleteUser = async (userId) => {
        try {
            return await userModel.findByIdAndDelete(userId);
        } catch (error) {
            throw error;
        }
    }

    getUserByLoginName = async (name) => {
        try {
            let user = await userModel.findOne({loginName: name})
            if (user)
                return user
            return null
        } catch (error) {
            throw error;
        }
    }

}