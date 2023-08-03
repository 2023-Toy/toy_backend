var express = require('express');
var router = express.Router();
const loginController = require('../controller/login.controller')
const uploads = require('../module/multer')
const authUtil = require('../middlewares/auth')

router.get('/login', authUtil.checkToken, loginController.getLogin);
router.post('/login', uploads.profile_upload.single("profile_img"),loginController.postLogin)
router.delete('/withdraw', loginController.deleteLogin);

module.exports = router;