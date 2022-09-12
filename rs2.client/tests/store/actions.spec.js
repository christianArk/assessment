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
        actions.$axios.post.mockResolvedValue(Promise.resolve(successRes))
        beforeEach(async () => {
            await actions.register({ commit }, {})
        })
        afterAll(() => {
            actions.$axios.post.mockReset()
        })
        it('should call signup', () => {
            expect(actions.$axios.post).toHaveBeenCalledWith('auth/signup', {})
        })
        it('should commit the received token on success', () => {
            expect(commit).toHaveBeenCalledWith('setAuth', token)
        })
        // it('should commit the received token on success', () => {
        //     expect(commit).toHaveBeenCalledWith('setAuth', token)
        // })
    })
})