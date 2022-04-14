<template>
  <section>
    <Header />

    <main>
        <section>
            <div class="container">
                <div class="search">
                    <div>
                        <label for="productName">Product Name <span class="required">*</span></label>
                        <input v-model="search.product" @keydown="filterInput($event)" type="text" id="productName">
                    </div>
                    <div>
                        <label for="productType">Product Type <span class="required">*</span></label>
                        <select v-model="search.type" name="product-type" id="productType">
                            <option v-for="(type, i) in productTypes" :key="i" :value="type">{{ type }}</option>
                        </select>
                    </div>
                    <div>
                        <label for="productQty">Quantity</label>
                        <input  v-model="search.quantity" type="number" id="productQty">
                    </div>
                    <div>
                        <label for="">&nbsp;</label>
                        <button v-if="!addingToBasket" @click="addToBasket()">Add</button>
                        <button v-else disabled>Please wait...</button>
                    </div>
                </div>
                <div v-if="errors.length" class="error-block">
                    <ul>
                      <li v-for="(error, i) in errors" :key="i">{{ error.msg }}</li>
                    </ul>
                    <span @click="clearErrors()">X</span>
                </div>
                <div class="result-list">
                    <h3>Your Items</h3>
                    <table v-if="!isLoading && basket.length">
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
                    <div v-if="isLoading" class="please-wait">
                      Please wait, fetching your basket...
                    </div>
                    <div v-if="!isLoading && basket.length == 0" class="please-wait">
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
          basket: [],
          errors: [],
          search: {
            product: '',
            type: '',
            quantity: ''
          }
      }
  },
  mounted() {
    this.getProductTypes()
    this.getUserBasket()
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
  methods: {
    getProductTypes() {
        this.$store.dispatch('getProductTypes', this.user).then(res => {
            this.productTypes = res
        }).catch(error => {
            this.$toast.error('An error occured fetching product types')
        })
    },
    getUserBasket() {
        this.isLoading = true
        this.$store.dispatch('getUserBasket', this.user).then(res => {
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
            this.$toast.success('Item successfully added to basket')
            this.addingToBasket = false
            // clear form
            this.clearForm()
            this.basket.push(res)
        }).catch(error => {
            this.addingToBasket = false
            this.errors = error.errors
            setTimeout(() => {
              this.clearErrors()
            }, 5000);
        })
      
    },
    removeItem(itemId) {
      let confirm = window.confirm("Are you sure you want to remove this item?")
      if (confirm)
      {
        this.$store.dispatch('deleteFromBasket', itemId).then(res => {
          this.$toast.success(res.message)
          this.basket = this.basket.filter(item => {
            return item._id != itemId
          })
        }).catch(error => {
          this.isLoading = false
          this.$toast.error('An error occured')
        })
      }
    },
    filterInput(e) {
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
