var express = require('express');
var router = express.Router();
const authUtil = require('../middlewares/auth')
const commentController = require('../controller/comment.controller')

//댓글 등록
router.post('/')
//댓글 수정
router.put('/')
//댓글 삭제
router.delete('/')

module.exports = router