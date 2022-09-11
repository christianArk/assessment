import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { LoaderTargetPlugin } from 'webpack';
import Index from '../pages/index.vue'

const localVue = createLocalVue()

localVue.use(Vuex);
jest.mock('axios')

describe('Index.vue', () => {
    let store;
    let actions;

    const productTypes = [
        'Type 1',
        'Type 2',
        'Type 3'
    ]

    const products = [
        {
            name: 'Item 1',
            type: 'Book',
            description: 'Desc 1'
        }
    ]

    const newBasketItem = {
        _id: 1,
        product: '1',
        user: '1',
        quantity: 1
    }

    const search = {
        product: '',
        type: '',
        quantity: ''
    }

    actions = {
        register: jest.fn(),
        authenticate: jest.fn(),
        getProductTypes: jest.fn().mockResolvedValue(productTypes),
        getProducts: jest.fn().mockResolvedValue(products),
        getUserBasket: jest.fn(),
        addToBasket: jest.fn().mockResolvedValue(newBasketItem),
        deleteFromBasket: jest.fn().mockResolvedValue()
    }
    
    store = new Vuex.Store({
        actions
    })

    const createMount = () => {
        return shallowMount(Index, { 
            store, 
            localVue,
            mocks: {
                $toast: {
                    success: jest.fn(),
                    error: jest.fn()
                }
            },
            computed: {
                hasBasket() {
                    return false
                },
                filteredProducts() {
                    return []
                }
            }
        })
    }


    describe('when mounting the page', () => {
        const wrapper = createMount();
        it('makes necessary calls (getProductTypes, getProducts, getUserBasket)', async () => { 
            expect(actions.getProductTypes).toHaveBeenCalled()
            expect(actions.getProducts).toHaveBeenCalled()
            expect(actions.getUserBasket).toHaveBeenCalled()
            await wrapper.vm.$nextTick();
            expect(wrapper.vm.productTypes).toEqual(productTypes)
            expect(wrapper.vm.products).toEqual(products)
        })
    })

    describe('when adding an item to basket', () => {

        const wrapper = createMount();

        const newItem = {product: 1, type: 'book', quantity: 1}

        beforeEach(() => {
            wrapper.setData({ errors: ['Sample Error Message'], search: newItem, basket: []})
            wrapper.vm.addToBasket()
        })

        it('clears any existing errors', async () => {
            expect(wrapper.vm.errors).toHaveLength(0)
        })

        it('makes addToBasket call', async () => {
            expect(actions.addToBasket).toHaveBeenCalled()
        })

        it('should update the basket', async () => {
            expect(wrapper.vm.basket).toHaveLength(1)
            expect(wrapper.vm.basket).toEqual([newBasketItem])
        })

        it('clear the form', async () => {
            expect(wrapper.vm.search).toEqual(search)
        })
    })


    describe('when removing an item', () => {
        const wrapper = createMount();

        beforeEach(() => {
            wrapper.setData({ basket: [newBasketItem]})
            window.confirm = jest.fn(() => true)
            wrapper.vm.removeItem(1)
        })

        it('makes deleteFromBasket request', async () => {
            expect(actions.deleteFromBasket).toHaveBeenCalled()
        })

        it('should remove item from the basket', async () => {
            expect(wrapper.vm.basket).toHaveLength(0)
            
        })
    })

})