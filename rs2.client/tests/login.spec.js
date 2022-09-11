const { createLocalVue, shallowMount } = require("@vue/test-utils")
import Vuex from 'vuex'
import Login from '../pages/login.vue'

const localVue = createLocalVue()

localVue.use(Vuex);
jest.mock('axios')

describe('Login.vue', () => {
    let store;
    let actions;

    actions = {
        authenticate: jest.fn().mockResolvedValue(),
    }
    
    store = new Vuex.Store({
        actions
    })

    const createMount = () => {
        return shallowMount(Login, {
            store, 
            localVue,
            mocks: {
                $toast: {
                    success: jest.fn(),
                    error: jest.fn()
                },
                $router: {
                    push: jest.fn()
                }
            },
            stubs: ['NuxtLink']
        })
    }

    describe('when mounting component', () => {
        const wrapper = createMount()
        it('should be defined', () => {
            expect(wrapper).toBeDefined()
        })
        it('button should be disabled', () => {
            expect(wrapper.vm.inputsAreDirty).toBeFalsy()
        })
    })

    describe('when logging in', () => {
        const wrapper = createMount()
        const spy = jest.spyOn(wrapper.vm.$router, 'push')
        beforeEach(() => {
            wrapper.vm.login()
        })
        it('should call the authenticate request', () => {
            expect(actions.authenticate).toHaveBeenCalled()
            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledWith('/')
        })
    })
})