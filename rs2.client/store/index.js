export const state = () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user') || "{}"),
    authenticated: localStorage.getItem('authenticated') || false,
})

export const mutations = {
    setAuth(state, data) {
        state.token = data.token
        state.user = data.user
        state.authenticated = true
        localStorage.setItem('token', state.token)
        localStorage.setItem('user', JSON.stringify(state.user))
        localStorage.setItem('authenticated', state.authenticated)
    },
    unsetAuth(state, data) {
        state.token = null
        state.user = {}
        state.authenticated = false
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('authenticated')
    }
}

export const actions = {
    async register({commit}, payload) {
        try {
            const res = await this.$axios.post('auth/signup', payload);
            commit('setAuth', res.data.data)
            return res
        } catch (error) {
            throw error
        }
    },
    async authenticate({commit}, payload) {
        try {
            const res = await this.$axios.post('auth/login', payload);
            commit('setAuth', res.data.data)
            return res
        } catch (error) {
            throw error
        }
    },
    async getProducts() {
        try {
            const res = await this.$axios.get('product');
            return res.data.data
        } catch (error) {
            throw error
        }
    },
    async getProductTypes() {
        return await this.$axios.get('product/types').then(res => {
            return res.data.data
        }).catch(error => {
            throw error
        })
    },
    async getUserBasket() {
        return await this.$axios.get('basket').then(res => {
            return res.data.data
        }).catch(error => {
            throw error
        })
    },
    async addToBasket({}, payload) {
        return await this.$axios.post(`basket`, payload).then(res => {
            return res.data.data
        }).catch(error => {
            throw error
        })
    },
    async deleteFromBasket({}, itemId) {
        return await this.$axios.delete(`basket/${itemId}`).then(res => {
            return res.data
        }).catch(error => {
            throw error
        })
    },
    async logout({commit}) {
        commit('unsetAuth')
        this.$router.push('/login')
    }
}