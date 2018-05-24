const jwt = require('jsonwebtoken');
const users = require('../models/users');
const bcrypt = require('bcryptjs');
require('dotenv').config()



module.exports = {
  signUp: function(req, res) {
    users.findOne({
      email: req.body.email
    })
    .then(userData => {
      if(userData == null) {
        const saltRounds = 10;
        let pass = bcrypt.hashSync(req.body.password, saltRounds);
    
        let newUser = new users({
          name: req.body.name,
          email: req.body.email,
          password: pass
        })
    
        newUser.save((err, result) => {
          if(err) {
            console.log(err);
          } else {
            let token = jwt.sign({ id: result._id, email: result.email }, process.env.SECRET)
            res.status(201).json({
              message: 'successfully added a new user !',
              token: token,
              id: result._id
            })
          }
        })
      } else {
        res.status(400).json({
          msg: 'Username taken, pick another username!'
        })
      }
    })


  },
  signIn: function(req, res) {
    users
      .findOne({ email: req.body.email})
      .then(user => {
        if(bcrypt.compareSync(req.body.password, user.password)){
          let token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET)
          res.status(200).json({
            token: token,
            id: user._id
          })
        } else {
          res.status(500).json({
            msg: 'wrong password or username!'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          msg: 'wrong password or username!'
        })
      })
  }
};