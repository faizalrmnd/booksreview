var express = require('express');
var router = express.Router();
const ulasanController = require('../controllers/ulasanController');
const middleware = require('../middleware/auth');

/* GET users listing. */
router.get('/', middleware.isUser, ulasanController.getUlasan);
router.post('/post', middleware.isUser, ulasanController.postUlasan);
router.post('/delete', middleware.isUser, ulasanController.removeUlasan);
router.put('/vote', middleware.isUser, ulasanController.vote);


module.exports = router;