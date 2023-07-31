var express = require('express');
var router = express.Router();

const communityController = require('../controller/community.controller')

router.post('/board', communityController.postCommunity);
router.delete('/board', communityController.deleteCommunity);
router.put('/board', communityController.updateCommunity);
router.get('/board/search', communityController.getCommunity);
router.get('/board/view', communityController.viewCommunity);

module.exports = router;