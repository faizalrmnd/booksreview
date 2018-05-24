import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bookList: [],
    book: ''
  },
  mutations: {
    setBookList: function (state, payload) {
      state.bookList = payload.data.sort(function (a, b) {
        return parseFloat(a.ulasan.length) - parseFloat(b.ulasan.length)
      }).reverse()
    },
    addBookToList: function (state, payload) {
      state.bookList.push(payload)
    },
    setUlasan: function (state, payload) {
      state.book = payload
    }
  },
  actions: {
    register: function (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/register', {
          name: payload.name,
          email: payload.email,
          password: payload.password
        })
          .then(function (response) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('id', response.data.id)
            resolve()
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
      })
    },
    login: function (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/login', {
          email: payload.email,
          password: payload.password
        })
          .then(function (response) {
            // context.commit('setUser', response.data.user)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('id', response.data.id)
            resolve()
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
      })
    },
    postBook: function (context, payload) {
      let token = localStorage.getItem('token')

      axios.post('http://localhost:3000/book/post', payload, { headers: { token: token } })
        .then(response => {
          console.log(response.data.data)
          context.commit('addBookToList', response.data.data)
        })
    },
    getBook: function (context) {
      let token = localStorage.getItem('token')

      axios
        .get('http://localhost:3000/book', { headers: { token: token } })
        .then(response => {
          // If request is good...
          console.log(response.data)
          context.commit('setBookList', response.data)
        })
        .catch((error) => {
          console.log('error 3 ' + error)
        })
    },
    getOneBook: function (context, payload) {
      let token = localStorage.getItem('token')

      axios
        .get(`http://localhost:3000/book/${payload}`, { headers: { token: token } })
        .then(response => {
        // If request is good...
          // console.log(response.data.data)
          context.commit('setUlasan', response.data.data)
        })
        .catch((error) => {
          console.log('error 3 ' + error)
        })
    }
  }
})
