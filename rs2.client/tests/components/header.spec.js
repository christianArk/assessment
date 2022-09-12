import Header from '../../components/header.vue'
const { createLocalVue, shallowMount } = require("@vue/test-utils")
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)


describe('Header.vue', () => {
    let wrapper
    let store
    let actions
    let state

    actions = {
        logout: jest.fn(),
    }

    state = {
        user: {
            username:'Chris'
        }
    }


    store = new Vuex.Store({
        actions,
        state
    })

    const createMount = () => {
        return shallowMount(Header, {
            store,
            localVue,
            mocks: {
                $toast: {
                    success: jest.fn()
                }
            }
        })
    }

    describe('When mounting the component', () => {
        wrapper = createMount()

        it('should be defined', () => {
            expect(wrapper).toBeDefined()
        })
        it('should compute username', () => {
            expect(wrapper.vm.username).toEqual('Chris')
        })
    })

    describe('When logging out', () => {
        wrapper = createMount()

        beforeEach(() => {
            wrapper.vm.logout()
        })

        it('should dispatch the logout action', () => {
            expect(actions.logout).toHaveBeenCalled()
            expect(actions.logout).toHaveBeenCalledTimes(1)
        })
    })
})