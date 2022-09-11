<template>
  <section>
    <Header />

    <main>
        <section>
            <div class="container">
                <div class="search">
                    <form @submit.prevent="addToBasket()">
                      <div class="product-name">
                          <label for="productName">Product Name <span class="required">*</span></label>
                          <input autocomplete="off" v-model="search.product" @keydown="filterInput($event)" @blur="hideSelections()" required type="text" id="productName">
                          <ul v-show="search.product.length && showSuggestions" class="suggestion">
                            <li v-for="(product, i) in filteredProducts" :key="i" @click="populateInputs(product)">{{ product.name }}</li>
                          </ul>
                      </div>
                      
                      <div>
                          <label for="productType">Product Type <span class="required">*</span></label>
                          <select v-model="search.type" name="product-type" required id="productType">
                              <option v-for="(type, i) in productTypes" :key="i" :value="type">{{ type }}</option>
                          </select>
                      </div>
                      <div>
                          <label for="productQty">Quantity</label>
                          <input  v-model="search.quantity" required min="1" type="number" id="productQty">
                      </div>
                      <div>
                          <label for="">&nbsp;</label>
                          <button v-if="!addingToBasket" type="submit">Add</button>
                          <button v-else disabled>Please wait...</button>
                      </div>
                    </form>
                </div>
                <div v-if="errors.length" class="error-block">
                    <ul>
                      <li v-for="(error, i) in errors" :key="i">{{ error.msg }}</li>
                    </ul>
                    <span @click="clearErrors()">X</span>
                </div>
                <div class="result-list">
                    <h3>Your Items</h3>
                    <div class="responsive-table">
                      <table v-if="!isLoading && hasBasket">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Type</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in basket" :key="i">
                                <td>{{ item.product.name }}</td>
                                <td>{{ item.product.type }}</td>
                                <td>{{ item.quantity }}</td>
                            </tr>
                        </tbody>
                      </table>
                    </div>
                    <div v-if="isLoading" class="please-wait">
                      Please wait, fetching your basket...
                    </div>
                    <div v-if="!isLoading && !hasBasket" class="please-wait">
                      Your basket is currently empty.
                    </div>
                </div>
            </div>
        </section>
    </main>
  </section>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: ['auth'],
  data() {
      return {
          addingToBasket: false,
          isLoading: false,
          productTypes: [],
          products: [],
          basket: [],
          errors: [],
          showSuggestions: false,
          search: {
            product: '',
            type: '',
            quantity: ''
          }
      }
  },
  watch: {
    'search.product'(value) {
      if(value.length > 30)
      {
        this.$toast.error('You cannot type more than 30 characters')
        this.search.product = value.substring(0, 30)
      }
    }
  },
  computed: {
    hasBasket() {
      return this.basket.length > 0
    },
    filteredProducts() {
      return this.products.filter(product => {
        return product.name.toLowerCase().includes(this.search.product.toLowerCase())
      })
    }
  },
  mounted() {
    this.getProductTypes()
    this.getAllProducts()
    this.getUserBasket()
  },
  methods: {
    hideSelections() {
      setTimeout(() => {
        this.showSuggestions = false
      }, 500);
    },
    populateInputs(product) {
      this.showSuggestions = false
      this.search.product = product.name
      this.search.type = product.type
    },
    getProductTypes() {
        this.$store.dispatch('getProductTypes').then(res => {
            this.productTypes = res
        }).catch(error => {
            this.$toast.error('An error occured fetching product types')
        })
    },
    getAllProducts() {
        this.$store.dispatch('getProducts').then(res => {
            this.products = res
        }).catch(error => {
            this.$toast.error('An error occured fetching products')
        })
    },
    getUserBasket() {
        this.isLoading = true
        this.$store.dispatch('getUserBasket').then(res => {
            this.isLoading = false
            this.basket = res
        }).catch(error => {
            this.isLoading = false
            this.$toast.error('An error occured fetching basket')
        })
    },
    addToBasket() {
      this.clearErrors()
      this.addingToBasket = true
      this.$store.dispatch('addToBasket', this.search).then(res => {
            this.addingToBasket = false
            this.basket.push(res)
            // // clear form
            this.clearForm()
            this.$toast.success('Item successfully added to basket')
        }).catch(error => {
            // this.addingToBasket = false
            // this.errors = error.errors
            // setTimeout(() => {
            //   this.clearErrors()
            // }, 5000);
        })
      
    },
    removeItem(itemId) {
      let confirm = window.confirm("Are you sure you want to remove this item?")
      if (confirm)
      {
        this.$store.dispatch('deleteFromBasket', itemId).then(res => {
          this.basket = this.basket.filter(item => {
            return item._id != itemId
          })
          this.$toast.success(res.message)
        }).catch(error => {
          this.isLoading = false
          this.$toast.error('An error occured')
        })
      }
    },
    filterInput(e) {
      this.showSuggestions = true
      const regex = /^[A-Za-z ]+$/;
      if (regex.test(e.key) === false) {
        this.$toast.error('Only letters are allowed')
        e.preventDefault()
        return false
      }
    },
    clearForm() {
      this.search = {
        product: '',
        type: '',
        quantity: ''
      }
    },
    clearErrors() {
      this.errors = []
    }
  }
}
</script>
