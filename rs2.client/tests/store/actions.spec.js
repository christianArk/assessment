import axios from "axios";
import { actions } from '../../store/index.js'

jest.mock('axios')

actions.$axios = axios

const commit = jest.fn()
const token = "testAuthToken"
const products = [{name: 'product 1'}, {name: 'product 2'}]

const successRes = {
    status: 200,
    data: {
        data: token
    }
}

const successProducsRes = {
    status: 200,
    data: {
        data: products
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
            await actions.$axios.get.mockResolvedValue(Promise.resolve(successProducsRes))
            actions.getProducts()
        })
        afterEach(() => {
            actions.$axios.get.mockClear()
        })
        it('should return an array of products', async () => {
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
})