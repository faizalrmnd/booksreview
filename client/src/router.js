import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Book from './views/Book.vue'
import Ulasan from './views/Ulasan.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/book',
      name: 'book',
      component: Book
    },
    {
      path: '/ulasan/:id',
      name: 'ulasan',
      component: Ulasan
    }
  ]
})
