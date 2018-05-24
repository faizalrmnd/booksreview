<template>
  <div class="cards">
    <div class="card" v-for="(buku, index) in bookList" v-bind:key='index' style="width: 18rem;">
      <img class="card-img-top" :src="buku.image" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{ buku.judul }}</h5>
        <p class="card-text">Penerbit: {{ buku.penerbit }}</p>
        <p class="card-text">Penulis: {{ buku.penulis }}</p>
        <p class="card-text">Jumlah ulasan: {{ buku.ulasan.length }}</p>
        <a href="#" @click="toDetail(buku._id)" class="btn btn-primary">Lihat Ulasan</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ItemCard',
  data () {
    return {
    }
  },
  methods: {
    toDetail: function (bookid) {
      this.$router.push(`/ulasan/${bookid}`)
    }
  },
  computed: {
    ...mapState(['bookList'])
  },
  created: function () {
    this.$store.dispatch('getBook')
  }
}
</script>

<style scoped>
  .cards {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .card {
    margin: 5px;
  }
</style>
