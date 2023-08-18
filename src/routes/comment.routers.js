var express = require('express');
var router = express.Router();
const authUtil = require('../middlewares/auth')
const commentController = require('../controller/comment.controller')

//댓글 등록
router.post('/', authUtil.checkToken, commentController.postComment)
//댓글 수정
router.put('/', authUtil.checkToken, commentController.putComment)
//댓글 삭제
router.delete('/', authUtil.checkToken, commentController.deleteComment)

module.exports = router