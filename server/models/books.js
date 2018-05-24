const mongoose = require('mongoose');

let bookSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  image: String,
  judul: String,
  penerbit: String,
  penulis: String,
  ulasan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ulasan' }],
  voter: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  upvote: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  downvote: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
},{
  timestamps: true
})

let book = mongoose.model('book', bookSchema)

module.exports = book;
