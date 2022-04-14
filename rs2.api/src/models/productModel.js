import mongoose from "mongoose"

const { Schema } = mongoose

export class ProductModel extends Schema {

    constructor()
    {
        super()
        const productSchema = {
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            description: {
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

        this.add(productSchema)

    }
}