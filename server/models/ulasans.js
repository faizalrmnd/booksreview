const mongoose = require('mongoose');

let ulasanSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  ulasan: String,
  voter: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  upvote: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  downvote: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
},{
  timestamps: true
})

let ulasan = mongoose.model('ulasan', ulasanSchema)

module.exports = ulasan;