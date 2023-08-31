const jwt = require("../module/jwt")
const commentService = require('../service/comment.service')

async function postComment(req, res, next){
    const jwt_token = req.headers.jwt_token
    const token = await jwt.verify(jwt_token)
    const {community_id, comment_content} = req.body
    const postComment_data = await commentService.postComment(token.IDX, token.ACCESS_TOKEN, community_id, comment_content)
    return res.status(postComment_data.Status).json(postComment_data)
}

async function putComment(req, res, next){
    const jwt_token = req.headers.jwt_token
    const token = await jwt.verify(jwt_token)
    const {comment_id, comment_content} = req.body
    const putComment_data = await commentService.putComment(token.IDX, token.ACCESS_TOKEN, comment_id, comment_content)
    return res.status(putComment_data.Status).json(putComment_data)
}

async function deleteComment(req, res, next){
    const jwt_token = req.headers.jwt_token
    const token = await jwt.verify(jwt_token)
    const community_id = req.body.community_id
    const deleteComment_data = await commentService.deleteComment(token.IDX, token.ACCESS_TOKEN, community_id)
    return res.status(deleteComment_data.Status).json(deleteComment_data)
}

module.exports = {
    postComment,
    putComment,
    deleteComment
}