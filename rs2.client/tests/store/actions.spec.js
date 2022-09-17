import axios from "axios";
import { actions } from '../../store/index.js'

jest.mock('axios')

actions.$axios = axios

actions.$router = {
    push: jest.fn()
}

const commit = jest.fn()
const token = "testAuthToken"
const products = [{name: 'product 1'}, {name: 'product 2'}]
const productTypes = ['Books','Music','Food']
const userBasket = [{name: 'product 1', quantity: 1}, {name: 'product 2', quantity: 2}]

const successRes = {
    status: 200,
    data: {
        data: token
    }
}

const successProductsRes = {
    status: 200,
    data: {
        data: products
    }
}

const successProductTypesRes = {
    status: 200,
    data: {
        data: productTypes
    }
}

const successUserBasketRes = {
    status: 200,
    data: {
        data: userBasket
    }
}

const successNewBasketRes = {
    status: 200,
    data: {
        data: userBasket[0]
    }
}

describe('Actions', () => {
    describe('on register', () => {
        beforeEach(async () => {
            await actions.$axios.post.mockResolvedValue(Promise.resolve(successRes))
            actions.register({ commit }, {})
        })
        afterEach(() => {
            actions.$axios.post.mockClear()
        })
        it('should call signup', async () => {
            expect(actions.$axios.post).toHaveBeenCalledWith('auth/signup', {})
        })
        it('should commit the received token on success', async () => {
            expect(commit).toHaveBeenCalledWith('setAuth', token)
        })
        it('should return error on fail', async () => {
            const err = new Error('Failed')
            actions.$axios.post.mockRejectedValue(Promise.reject(err))
            expect.assertions(1)
            try {
                await actions.register({ commit }, {})
            } catch (errorMsg) {
                await expect(async () => {
                    await errorMsg
                }).rejects.toThrowError(err)
            }
        })
    })

    describe('on login', () => {
        beforeEach(async () => {
            await actions.$axios.post.mockResolvedValue(Promise.resolve(successRes))
            actions.authenticate({ commit }, {})
        })
        afterEach(() => {
            actions.$axios.post.mockClear()
        })
        it('should call login', async () => {
            expect(actions.$axios.post).toHaveBeenCalledWith('auth/login', {})
        })
        it('should commit the received token on success', async () => {
            expect(commit).toHaveBeenCalledWith('setAuth', token)
        })
        it('should return error on fail', async () => {
            const err = new Error('Failed')
            actions.$axios.post.mockRejectedValue(Promise.reject(err))
            expect.assertions(1)
            try {
                await actions.authenticate({ commit }, {})
            } catch (errorMsg) {
                await expect(async () => {
                    await errorMsg
                }).rejects.toThrowError(err)
            }
        })
    })

    describe('on getProducts', () => {
        beforeEach(async () => {
            await actions.$axios.get.mockResolvedValue(Promise.resolve(successProductsRes))
            actions.getProducts()
        })
        afterEach(() => {
            actions.$axios.get.mockClear()
        })
        it('should call the correct endpoint', async () => {
            expect(actions.$axios.get).toBeCalledWith('product')
        })
        it('should return an array of products', async () => {
            expect(await actions.getProducts()).toEqual(products)
        })
        it('should return error on fail', async () => {
            const err = new Error('Failed')
            actions.$axios.get.mockRejectedValue(Promise.reject(err))
            expect.assertions(1)
            try {
                await actions.getProducts()
            } catch (errorMsg) {
                await expect(async () => {
                    await errorMsg
                }).rejects.toThrowError(err)
            }
        })
    })

    describe('on getProductsTypes', () => {
        beforeEach(async () => {
            await actions.$axios.get.mockResolvedValue(Promise.resolve(successProductTypesRes))
            actions.getProductTypes()
        })
        afterEach(() => {
            actions.$axios.get.mockClear()
        })
        it('should call the correct endpoint', async () => {
            expect(actions.$axios.get).toBeCalledWith('product/types')
        })
        it('should return an array of product types', async () => {
            expect(await actions.getProductTypes()).toEqual(productTypes)
        })
        it('should return error on fail', async () => {
            const err = new Error('Failed')
            actions.$axios.get.mockRejectedValue(Promise.reject(err))
            expect.assertions(1)
            try {
                await actions.getProductTypes()
            } catch (errorMsg) {
                await expect(async () => {
                    await errorMsg
                }).rejects.toThrowError(err)
            }
        })
    })

    describe('on getUserBasket', () => {
        beforeEach(async () => {
            await actions.$axios.get.mockResolvedValue(Promise.resolve(successUserBasketRes))
            actions.getUserBasket()
        })
        afterEach(() => {
            actions.$axios.get.mockClear()
        })
        it('should call the correct endpoint', async () => {
            expect(actions.$axios.get).toBeCalledWith('basket')
        })
        it('should return an array containing user basket items', async () => {
            expect(await actions.getUserBasket()).toEqual(userBasket)
        })
        it('should return error on fail', async () => {
            const err = new Error('Failed')
            actions.$axios.get.mockRejectedValue(Promise.reject(err))
            expect.assertions(1)
            try {
                await actions.getUserBasket()
            } catch (errorMsg) {
                await expect(async () => {
                    await errorMsg
                }).rejects.toThrowError(err)
            }
        })
    })

    describe('on addToBasket', () => {
        const payload = userBasket[0]
        beforeEach(async () => {
            await actions.$axios.post.mockResolvedValue(Promise.resolve(successNewBasketRes))
            actions.addToBasket({}, payload)
        })
        afterEach(() => {
            actions.$axios.post.mockClear()
        })
        it('should call the correct endpoint', async () => {
            expect(actions.$axios.post).toBeCalledWith('basket', payload)
        })
        it('should return newly added item', async () => {
            expect(await actions.addToBasket({}, payload)).toEqual(userBasket[0])
        })
        it('should return error on fail', async () => {
            const err = new Error('Failed')
            actions.$axios.post.mockRejectedValue(Promise.reject(err))
            expect.assertions(1)
            try {
                await actions.addToBasket({}, payload)
            } catch (errorMsg) {
                await expect(async () => {
                    await errorMsg
                }).rejects.toThrowError(err)
            }
        })
    })

    describe('on deleteFromBasket', () => {
        const itemId = 1
        beforeEach(async () => {
            await actions.$axios.delete.mockResolvedValue(Promise.resolve())
            actions.deleteFromBasket({}, itemId)
        })
        afterEach(() => {
            actions.$axios.delete.mockClear()
        })
        it('should call the correct endpoint', async () => {
            expect(actions.$axios.delete).toBeCalledWith(`basket/${itemId}`)
        })
        it('should return error on fail', async () => {
            const err = new Error('Failed')
            actions.$axios.delete.mockRejectedValue(Promise.reject(err))
            expect.assertions(1)
            try {
                await actions.deleteFromBasket({}, itemId)
            } catch (errorMsg) {
                await expect(async () => {
                    await errorMsg
                }).rejects.toThrowError(err)
            }
        })
    })

    describe('on logout', () => {
        const itemId = 1
        beforeEach(async () => {
            actions.logout({commit})
        })
        it('should dispatch unsetAuth', () => {
            expect(commit).toHaveBeenCalledWith('unsetAuth')
        })
        it('should redirect to login', () => {
            expect(actions.$router.push).toHaveBeenCalledWith('/login')
        })
    })
})