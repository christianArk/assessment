import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
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
            name: 'Item One',
            type: 'Book 1',
            description: 'Desc 1'
        },
        {
            name: 'Item Two',
            type: 'Book 2',
            description: 'Desc 2'
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

    describe('when hiding selections', () => {
        const wrapper = createMount();

        beforeEach(() => {
            jest.useFakeTimers()
            wrapper.setData({ showSuggestions: true})
            wrapper.vm.hideSelections()
        })

        afterAll(() => {
            jest.useRealTimers()
        })

        it('should hide selections', async () => {
            jest.runAllTimers()
            expect(wrapper.vm.showSuggestions).toBeFalsy();
        })
    })

    describe('when populating inputs', () => {
        const product = { name: 'Product 1', type: 'Type 1'}
        const wrapper = createMount();

        beforeEach(() => {
            wrapper.setData({search: {}})
            wrapper.vm.populateInputs(product)
        })

        it('should hide selections', async () => {
            expect(wrapper.vm.showSuggestions).toBeFalsy();
        })

        it('should populate search model', async () => {
            expect(wrapper.vm.search.product).toEqual(product.name);
            expect(wrapper.vm.search.type).toEqual(product.type);
        })
    })

    describe('when filtering inputs', () => {
        const wrapper = createMount();

        // beforeEach(async () => {
        //     wrapper.setData({products: products, search: { product: 'Item 1' }})
        // })

        afterEach(() => {
            jest.clearAllMocks()
        })

        it('should call filterInput', async () => {
            const spy = jest.spyOn(wrapper.vm, 'filterInput')
            const input = wrapper.find('input#productName')
            const event = new KeyboardEvent('keydown')
            await input.trigger('keydown', { keyCode: 80 })
            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledWith(event)
        })

        it('should return false for numbers and special characters', async () => {
            const event = new KeyboardEvent('keydown', { key: '123' })
            const input = await wrapper.vm.filterInput(event)
            expect(input).toBeFalsy()
        })

        it('should return true for characters a-zA-Z and space', async () => {
            const event = new KeyboardEvent('keydown', { key: 'Item One' })
            const input = await wrapper.vm.filterInput(event)
            wrapper.vm.$nextTick()
            expect(input).toBeTruthy()
        })
    })

})