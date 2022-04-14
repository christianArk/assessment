import mongoose from "mongoose"

const { Schema } = mongoose

export class BasketModel extends Schema {

    constructor()
    {
        super()
        const basketSchema = {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            quantity: {
                type: Number,
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

        this.set('toJSON', { getters: true })
        this.set('toObject', { getters: true})

        this.add(basketSchema)

    }
}