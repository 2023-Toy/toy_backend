const logger = require('../config/logger')
const commonDao = require('../DAO/common.dao')
const commentDao = require('../DAO/comment.dao')

async function postComment(id, token, community_id, comment_content){
    try{
        if(!comment_content && !community_id){
            return {
                Message : "실패",
                Status : 406,
                Error : "community_id와 댓글 내용이 없습니다."
            }
        }
        else if(!community_id){
            return {
                Message : "실패",
                Status : 406,
                Error : "community_id가 없습니다."
            }
        }
        else if(!comment_content){
            return {
                Message : "실패",
                Status : 406,
                Error : "댓글 내용이 없습니다."
            }
        }
        const name = await commonDao.findName(id)
        await commentDao.postComment(id, token, community_id, comment_content)
        logger.info(
            '[Comment 등록 시도] => ' + '[' + token + '] ' + name + ' 성공'
        )
        return {
            Message: "성공",
            Status : 200
        }
    } catch(err) {
        return {
            Message: "실패",
            Status: 400,
            Error: err
        }
    }
}

async function putComment(){

}

async function deleteComment(){

}

module.exports = {
    postComment,
    putComment,
    deleteComment
}