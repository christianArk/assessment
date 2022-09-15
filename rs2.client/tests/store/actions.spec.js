import axios from "axios";
import { actions } from '../../store/index.js'

jest.mock('axios')

actions.$axios = axios

const commit = jest.fn()
const token = "testAuthToken"
const successRes = {
    status: 200,
    data: {
        data: token
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
                expect(errorMsg).toEqual(err)
            }
        })
    })
})