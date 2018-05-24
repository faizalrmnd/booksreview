var express = require('express');
var router = express.Router();
const bookController = require('../controllers/bookController');
const middleware = require('../middleware/auth')
const images = require('../helpers/images')

/* GET users listing. */
router.get('/', middleware.isUser, bookController.getBooks);
router.get('/:id', middleware.isUser, bookController.getOne);
router.post('/post', middleware.isUser, images.multer.single('image'), images.sendUploadToGCS, bookController.postBook);
router.post('/find/:userid', middleware.isUser, bookController.findBookByUser);
router.post('/delete/:id', middleware.isUser, bookController.removeBook);
router.put('/vote', middleware.isUser, bookController.vote);


module.exports = router;