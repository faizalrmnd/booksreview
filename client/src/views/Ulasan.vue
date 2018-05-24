<template>
  <div>
    <navbar/>
    <center>
      <div class="card">
        <h5 class="card-header">{{ book.judul }}</h5>
        <div class="card-body">
          <img class="card-img-top" :src="book.image" alt="Card image cap">
          <h5 class="card-title">Penulis: {{ book.penulis }}</h5>
          <h6 class="card-title">Penerbit: {{ book.penerbit }}</h6>
          <p class="card-text">Posted by: {{ book.user.name }}</p>
          <button @click="vote(answer._id, 'plus')" type="button" class="btn btn-primary">
            upvote 
          </button>
          {{ book.upvote.length - book.downvote.length }}
          <button @click="vote(book._id, 'minus')" type="button" class="btn btn-primary">
            downvote 
          </button>
        </div>
        <button type="button" v-if="book.user._id === id" id="del" class="btn btn-danger">Hapus</button>
      </div>
    </center>
    <br>
    <h3>Ulasan:</h3>
    <center>
    <div v-for="(ulasan, index) in book.ulasan" v-bind:key='index' class="card">
      <div class="card-body">
        <h4 class="card-title">{{ ulasan.ulasan }}</h4>
        <p class="card-text">By: {{ ulasan.user.name }}</p>

          <button @click="ulasanVote(ulasan._id, 'plus')" type="button" class="btn btn-primary">
            upvote 
          </button>
          {{ ulasan.upvote.length - ulasan.downvote.length }}
          <button @click="ulasanVote(ulasan._id, 'minus')" type="button" class="btn btn-primary">
            downvote 
          </button>

      </div>
      <button type="button" v-if="ulasan.user._id === id" id="del" class="btn btn-danger">Hapus</button>
    </div>
    <h3>Ulas buku ini:</h3>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Ulasan</label>
      <textarea class="form-control" v-model="ulasan" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <a href="#" @click="postUlasan(book._id)" class="btn btn-primary">Post</a>
    </center>
  </div>
</template>

<script>
import navbar from '@/components/NavBar.vue'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'book',
  components: {
    navbar
  },
  computed: {
    ...mapState(['book'])
  },
  data () {
    return {
      ulasan: '',
      id: localStorage.getItem('id')
    }
  },
  methods: {
    postUlasan: function (bookid) {
      let token = localStorage.getItem('token')
      let self = this

      axios.post('http://localhost:3000/review/post', {
        bookid: bookid,
        ulasan: this.ulasan
      }, { headers: { token: token } })
        .then(function (response) {
          let payload = self.$route.params.id
          this.$store.dispatch('getOneBook', payload)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    // ,
    // vote: function (questionId, command) {
    //   let token = localStorage.getItem('token')
    //   let self = this

    //   axios.put('http://35.197.134.112/question/vote', {
    //     id: questionId,
    //     command: command
    //   }, { headers: { token: token } })
    //     .then(function (response) {
    //       self.$store.dispatch('getQuestion', token)

    //       setTimeout(function () {
    //         self.$store.dispatch('getAnswer', self.$store.state.answer._id)
    //       }, 1000)
    //     })
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    // },
    // ulasanVote: function (answerId, command) {
    //   let token = localStorage.getItem('token')
    //   let self = this

    //   axios.put('http://35.197.134.112/answer/vote', {
    //     id: answerId,
    //     command: command
    //   }, { headers: { token: token } })
    //     .then(function (response) {
    //       self.$store.dispatch('getQuestion', token)

    //       setTimeout(function () {
    //         self.$store.dispatch('getAnswer', self.$store.state.answer._id)
    //       }, 1000)
    //     })
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    // }
  },
  created () {
    let payload = this.$route.params.id
    this.$store.dispatch('getOneBook', payload)
  }
}

</script>

<style scoped>
  .card {
    width: 500px;
    align-self: center;
    border: solid slategrey;
  }
  textarea {
    width: 500px;
  }
  #del {
    width: 80px;
  }
</style>
