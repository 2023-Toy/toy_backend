var express = require('express');
var router = express.Router();
const authUtil = require('../middlewares/auth')
const communityController = require('../controller/community.controller')

// router.post('/board', communityController.postCommunity);
// router.delete('/board', communityController.deleteCommunity);
// router.put('/board', communityController.updateCommunity);

router.get('/', authUtil.checkToken, communityController.getCommunityBoard)
router.get('/main', authUtil.checkToken, communityController.getMain)
router.get('/community', authUtil.checkToken, communityController.getCommunity)


module.exports = router;