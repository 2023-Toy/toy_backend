var express = require('express');
var router = express.Router();
const memberController = require('../controller/member.controller')
const uploads = require('../module/multer')
const authUtil = require('../middlewares/auth')

router.get('', authUtil.checkToken, memberController.getProfile);
router.put('/name', authUtil.checkToken, memberController.updateName)
router.put('/img', authUtil.checkToken, uploads.profile_upload.single("profile_img"), memberController.updateImg)
router.get('/recentView', authUtil.checkToken, memberController.getRecentList)
router.get('/heart', authUtil.checkToken, memberController.getHeartList)

module.exports = router;
