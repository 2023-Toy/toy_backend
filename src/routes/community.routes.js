var express = require('express');
var router = express.Router();
const authUtil = require('../middlewares/auth')
const communityController = require('../controller/community.controller')

router.get('/test', communityController.test)

router.get('/', authUtil.checkToken, communityController.getCommunityBoard)
router.get('/main', authUtil.checkToken, communityController.getMain)
router.get('/community', authUtil.checkToken, communityController.getCommunity)
router.get('/search', authUtil.checkToken, communityController.getSearch)

router.post('/', authUtil.checkToken, communityController.postCommunity)

module.exports = router;