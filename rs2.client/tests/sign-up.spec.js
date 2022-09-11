const { createLocalVue, shallowMount } = require("@vue/test-utils")
import Vuex from 'vuex'
import SignUp from '../pages/sign-up.vue'

const localVue = createLocalVue()

localVue.use(Vuex);
jest.mock('axios')

describe('SignUp.vue', () => {
    let store;
    let actions;

    actions = {
        register: jest.fn().mockResolvedValue(),
    }
    
    store = new Vuex.Store({
        actions
    })

    const createMount = () => {
        return shallowMount(SignUp, {
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

    describe('when signing up', () => {
        const wrapper = createMount()
        const spy = jest.spyOn(wrapper.vm.$router, 'push')
        beforeEach(() => {
            wrapper.vm.signup()
        })
        it('should call the register request', () => {
            expect(actions.register).toHaveBeenCalled()
            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledWith('/')
        })
    })
})