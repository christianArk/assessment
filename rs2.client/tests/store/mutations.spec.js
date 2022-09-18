import { mutations, state } from '../../store/index.js'

describe('Mutations', () => {

    let storeItems = {}

    beforeAll(() => {
        global.Storage.prototype.setItem = jest.fn((key, value) => {
            storeItems[key] = value
        })
        global.Storage.prototype.getItem = jest.fn((key) => storeItems[key])
        global.Storage.prototype.removeItem = jest.fn((key) => delete storeItems[key])
    })

    beforeEach(() => {
        // make sure the fridge starts out empty for each test
        storeItems = {}
      })

    afterAll(() => {
        // return our mocks to their original values
        // 🚨 THIS IS VERY IMPORTANT to avoid polluting future tests!
        global.Storage.prototype.setItem.mockReset()
        global.Storage.prototype.getItem.mockReset()
    })

    const storeState = state()
    const data = {
        token: 'testToken',
        user: 'testUser'
    }
    describe('on setAuth', () => {
        beforeEach(() => {
            mutations.setAuth(storeState, data)
        })
        it('should set token', async () => {
            expect(storeState.token).toEqual(data.token)
        })
        it('should set user', async () => {
            expect(storeState.user).toEqual(data.user)
        })
        it('should set authenticated to true', async () => {
            expect(storeState.authenticated).toBeTruthy()
        })
        it('should set localStorage token, user, authenticated', async () => {
            // expect(global.Storage.prototype.setItem).toHaveBeenCalledTimes(3)
            expect(global.Storage.prototype.setItem).toHaveBeenCalledWith('token', data.token)
            expect(global.Storage.prototype.setItem).toHaveBeenCalledWith('user', JSON.stringify(data.user))
            expect(global.Storage.prototype.setItem).toHaveBeenCalledWith('authenticated', true)
        })
    })
    describe('on unsetAuth', () => {
        beforeEach(() => {
            mutations.unsetAuth(storeState, data)
        })
        it('should set token', async () => {
            expect(storeState.token).toEqual(null)
        })
        it('should set user', async () => {
            expect(storeState.user).toEqual({})
        })
        it('should set authenticated to true', async () => {
            expect(storeState.authenticated).toBeFalsy()
        })
        it('should remove from localStorage token, user, authenticated', async () => {
            // expect(global.Storage.prototype.setItem).toHaveBeenCalledTimes(3)
            expect(global.Storage.prototype.removeItem).toHaveBeenCalledWith('token')
            expect(global.Storage.prototype.removeItem).toHaveBeenCalledWith('user')
            expect(global.Storage.prototype.removeItem).toHaveBeenCalledWith('authenticated')
        })
    })
})