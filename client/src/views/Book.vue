<template>
  <div>
    <!-- Button trigger modal -->
    <navbar/>
    <button id="add" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
      Post A Book
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Post A Book</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <p>Judul:</p>
              <input class="form-control" v-model="judul" type="text" placeholder="Judul Buku">
              <p>Penerbit:</p>
              <input class="form-control" v-model="penerbit" type="text" placeholder="Penerbit">
              <p>Penulis:</p>
              <input class="form-control" v-model="penulis" type="text" placeholder="Penulis">
              <div class="form-group">
                <label for="exampleFormControlFile1">Input Photo</label>
                <input type="file" id="image" class="form-control-file">
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" @click="postBook" class="btn btn-primary" data-dismiss="modal">Post Book</button>
          </div>
        </div>
      </div>
    </div>
    <center>
      <BookList/>
    </center>
  </div>
</template>

<script>
import navbar from '@/components/NavBar.vue'
import BookList from '@/components/BookList.vue'

export default {
  name: 'books',
  components: {
    navbar,
    BookList
  },
  data () {
    return {
      judul: '',
      penerbit: '',
      penulis: ''
    }
  },
  methods: {
    postBook: function () {
      const fileInput = document.querySelector('#image')

      const payload = new FormData()

      payload.append('image', fileInput.files[0])
      payload.append('judul', this.judul)
      payload.append('penerbit', this.penerbit)
      payload.append('penulis', this.penulis)

      this.$store.dispatch('postBook', payload)
    }
  },
  mounted () {
    let token = localStorage.getItem('token')

    if (!token) {
      this.$router.push('/')
    }
  }
}
</script>

<style>
  #add {
    margin: 25px;
  }
</style>