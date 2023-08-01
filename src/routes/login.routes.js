var express = require('express');
var router = express.Router();
const loginController = require('../controller/login.controller')
const uploads = require('../module/multer')

router.get('/login', loginController.getLogin);
router.post('/login', uploads.upload.single("profile_img"),loginController.postLogin);
// router.delete('/withdraw', loginController.deleteLogin);

module.exports = router;