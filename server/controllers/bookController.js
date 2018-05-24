const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const book = require('../models/books');

module.exports = {
  getBooks: function (req, res) {
    book.find({})
            .populate('user')
            .populate({
              path: 'ulasan',
              populate: { path: 'user' }
            })
            .then(books => {
              res.status(200).json({
                data: books
              })
            })
  },
  getOne: function (req, res) {
    book.findOne({ _id: req.params.id})
      .populate('user')
      .populate({
        path: 'ulasan',
        populate: { path: 'user' }
      })
      .then(result => {
        res.status(200).json({
          data: result
        })
      })
  },
  postBook: function (req, res) {
    let token = req.headers.token;

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      let newBook = new book({
        user: decoded.id,
        judul: req.body.judul,
        penerbit: req.body.penerbit,
        penulis: req.body.penulis,
        image: req.file.cloudStoragePublicUrl
      })

      newBook.save((err, result) => {
        if(err) {
          console.log(err);
        } else {
          res.status(201).json({
            message: 'successfully added a new book !',
            data: result
          })
        }
      })
    })
  },
  removeBook: function (req, res) {
    book.findByIdAndRemove({ _id: req.params.id })
    .then(update => {
      res.status(200).json({
        message: `berhasil menghapus data`,
        data: update
      })
    })
  },
  findBookByUser: function (req, res) {
    book.find({ user: req.params.userid})
      .then(books => {
        res.status(200).json({
          data: books
        })
      })
  },
  vote: function (req, res) {
    let token = req.headers.token;

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      book.findById({ _id: req.body.id })
      .then(result => {
        if(!result.voter.includes(decoded.id)) {
          if (req.body.command ==='plus') {
            book.findByIdAndUpdate({ _id: req.body.id }, {
              $push: { voter: mongoose.Types.ObjectId(decoded.id) }
            })
            .then(addVoter => {
              book.findByIdAndUpdate({ _id: req.body.id }, {
                $push: { upvote: mongoose.Types.ObjectId(decoded.id) }
              })
              .then(upvoted => {
                res.status(200).json({
                  message: `berhasil menambah vote`,
                  data: upvoted
                })
              })
            })
          } else if (req.body.command === 'minus') {
            book.findByIdAndUpdate({ _id: req.body.id }, {
              $push: { voter: mongoose.Types.ObjectId(decoded.id) }
            })
            .then(addVoter => {
              book.findByIdAndUpdate({ _id: req.body.id }, {
                $push: { downvote: mongoose.Types.ObjectId(decoded.id) }
              })
              .then(upvoted => {
                res.status(200).json({
                  message: `berhasil mengurangi vote`,
                  data: upvoted
                })
              })
            })
          }
        } else {
          res.status(500).json({
            message: 'sudah pernah vote'
          })
        }
      })
    })
  }
}