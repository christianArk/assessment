<template>
    <section class="login-main">
        <div class="left-side">
            <div>
                <h1>RS2 Assessment</h1>
                <p>View and add products to your basket</p>
            </div>
        </div>
        <div class="right-side">
            <div>
                <h1>Create An Account</h1>
                <div class="form">
                    <form action="">
                        <div>
                            <label for="username">Username</label>
                            <input type="text" id="username" v-model="user.loginName" required />  
                        </div>
                        <div>
                            <label for="password">Password</label>
                            <input type="password" id="password" v-model="user.password" required />  
                        </div>
                        <div>
                            <button :disabled="!inputsAreDirty" v-if="!isLoading" @click.prevent="signup">Register</button> 
                            <button disabled v-else>Please wait...</button> 
                        </div>
                    </form>
                    <NuxtLink to="/login" class="sign-up">Login</NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
      return {
          isLoading: false,
          user: {
              loginName: '',
              password: ''
          }
      }
  },
  computed: {
      inputsAreDirty() {
          if (this.user.loginName.length && this.user.password.length)
          {
            return true;
          } else {
            return false;
          }
      }
  },
  methods: {
    signup() {
        this.isLoading = true
        this.$store.dispatch('register', this.user).then(res => {
            this.$toast.success('Registration successful')
            this.$router.push('/')
            this.isLoading = false
        }).catch(error => {
            this.isLoading = false
            this.$toast.error(error.error)
        })
    }
  }
}
</script>
