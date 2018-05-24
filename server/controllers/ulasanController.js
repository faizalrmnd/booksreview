const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ulasan = require('../models/ulasans');
const book = require('../models/books');

module.exports = {
  getUlasan: function(req, res) {
    ulasan.find({ book: mongoose.Types.ObjectId(req.headers.bookId)})
    .then(ulasans => {
      res.status(200).json({
        data: ulasans
      })
    })
  },
  postUlasan: function(req, res) {
    let token = req.headers.token;

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      let newUlasan = new ulasan({
        user: decoded.id,
        ulasan: req.body.ulasan
      })

      newUlasan.save((err, result) => {
        if(err) {
          console.log(err);
        } else {
          book.findByIdAndUpdate({ _id: req.body.bookid }, {
            $push: { ulasan: mongoose.Types.ObjectId(result.id) }
          })
          .then(update => {
            res.status(200).json({
              message: `berhasil menambah answer`,
              data: update
            })
          })
        }
      })
    })
  },
  removeUlasan: function(req, res) {
    ulasan.findByIdAndRemove({ _id: req.body.id })
    .then(update => {
      res.status(200).json({
        message: `berhasil menghapus data`,
        data: update
      })
    })
  },
  vote: function (req, res) {
    let token = req.headers.token;

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      ulasan.findById({ _id: req.body.id })
      .then(result => {
        if(!result.voter.includes(decoded.id)) {
          if (req.body.command ==='plus') {
            ulasan.findByIdAndUpdate({ _id: req.body.id }, {
              $push: { voter: mongoose.Types.ObjectId(decoded.id) }
            })
            .then(addVoter => {
              ulasan.findByIdAndUpdate({ _id: req.body.id }, {
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
            ulasan.findByIdAndUpdate({ _id: req.body.id }, {
              $push: { voter: mongoose.Types.ObjectId(decoded.id) }
            })
            .then(addVoter => {
              ulasan.findByIdAndUpdate({ _id: req.body.id }, {
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