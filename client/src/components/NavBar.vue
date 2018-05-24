<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary col-12 px-5">

    <a class="navbar-brand" href="#">BookReview!</a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" @click="toBook">Books</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-if="isLoggedIn === true" @click="logout" href="#">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      isLoggedIn: false,
      token: localStorage.getItem('token')
    }
  },
  methods: {
    logout: function () {
      localStorage.clear()
      this.$router.push('/')
    },
    toBook: function () {
      this.$router.push('/book')
    }
  },
  created () {
    let token = localStorage.getItem('token')

    if (token) {
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false
    }
  }
  // watch: {
  //   isLoggedIn: function (val) {
  //     if (val !== null) {
  //       this.isLoggedIn = true
  //     } else {
  //       this.isLoggedIn = false
  //     }
  //   }
  // }
}
</script>

<style>

</style>
