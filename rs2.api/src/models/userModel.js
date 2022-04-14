import mongoose from "mongoose"

const { Schema } = mongoose

export class UserModel extends Schema {

    constructor()
    {
        super()
        const userSchema = {
            loginName: {
                type: String,
                required: true
            },
            hashPassword: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
            }
        }

        this.add(userSchema)

    }
}