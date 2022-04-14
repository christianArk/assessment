<template>
    <header>
        <h1 class="logo">MK2 Assessment</h1>
        <nav>
            <ul>
                <li>{{ username }}</li>
                <li>
                    <button @click="logout()" class="logout">Logout</button>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
      return {}
  },
  computed: {
    username() {
        return this.$store.state.user.username
    }
  },
  methods: {
    logout() {
        this.$store.dispatch('logout', this.user).then(res => {
            this.$toast.success('Successfully logged out')
        }).catch(error => {
            this.$toast.success('Failed to logout')
        })
    }
  }
}
</script>