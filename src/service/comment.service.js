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

//커뮤니티 댓글 수정
async function putComment(id, token, comment_id, comment_content){
    try{
        if(!comment_content && !comment_id){
            return {
                Message : "실패",
                Status : 406,
                Error : "comment_id와 댓글 내용이 없습니다."
            }
        }
        else if(!comment_id){
            return {
                Message : "실패",
                Status : 406,
                Error : "comment_id가 없습니다."
            }
        }
        else if(!comment_content){
            return {
                Message : "실패",
                Status : 406,
                Error : "댓글 내용이 없습니다."
            }
        }
        //id 비교
        const preUserid = await commonDao.findCommentUser(comment_id)
        const name = await commonDao.findName(id)
        if(preUserid !== id){
            logger.error(
                '[댓글 수정 ERROR] => ' + '[access_token : ' + token + " ] [user_id : " + id + " ] " + name +
                '\n \t' + name + '은 comment_id : ' + comment_id + '의 작성자가 아닙니다.'
            )
            return {
                Message : "실패",
                Status : 406,
                Error : name+'은 해당 댓글의 작성자가 아닙니다.'
            }
        }
        await commentDao.putComment(id, token, name, comment_id, comment_content)
        logger.info(
            '[Comment 수정 시도] => ' + '[' + token + '] ' + name + ' 성공'
        )
        return {
            Message: "성공",
            Status : 200
        }
    }
    catch (err){
        return {
            Message: "실패",
            Status: 400,
            Error: err
        }
    }
}

async function deleteComment(id, token, comment_id){
    try{
        if(!comment_id){
            return {
                Message : "실패",
                Status : 406,
                Error : "comment_id가 없습니다."
            }
        }
        const preUserid = await commonDao.findCommentUser(comment_id)
        const name = await commonDao.findName(id)
        if(preUserid !== id){
            logger.error(
                '[댓글 수정 ERROR] => ' + '[access_token : ' + token + " ] [user_id : " + id + " ] " + name +
                '\n \t' + name + '은 comment_id : ' + comment_id + '의 작성자가 아닙니다.'
            )
            return {
                Message : "실패",
                Status : 406,
                Error : name+'은 해당 댓글의 작성자가 아닙니다.'
            }
        }
        await commentDao.deleteComment(id, token, name, comment_id)
        logger.info(
            '[Comment 삭제 시도] => ' + '[' + token + '] ' + name + ' 성공'
        )
        return {
            Message: "성공",
            Status : 200
        }
        return{
            Message: "성공",
            Status : 200
        }
    }
    catch(err){
        return {
            Message: "실패",
            Status: 400,
            Error: err
        }
    }
}

module.exports = {
    postComment,
    putComment,
    deleteComment
}