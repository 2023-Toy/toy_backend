const db = require('../config/db');
const logger = require('../config/logger')
const {query} = require("winston");

function postComment(id, token, community_id, comment_content){
    return new Promise((resolve, reject) => {
        const currentDateTime = new Date().toISOString().slice(0,10)
        const queryData = `insert into Comment(user_id, community_id, comment_content, comment_date) values(${id}, ${community_id}, "${comment_content}", '${currentDateTime}');`
        db.query(queryData, (error) =>{
            if(error){
                logger.error(
                    'DB error [comment 추가]' + '=> ' + token +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve("성공")
        })
    })
}

function putComment(id, token, name, comment_id, comment_content){
    return new Promise((resolve, reject) => {
        const currentDateTime = new Date().toISOString().slice(0, 10)
        const queryData = `update Comment set comment_content = "${comment_content}", comment_date = "${currentDateTime}" where comment_id = ${comment_id}`
        db.query(queryData, (error) => {
            if(error){
                logger.error(
                    'DB error [comment 수정] => ' + token + ' 소유자 ' + name + ' [user_id : ' + id + ' ]'+
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve("성공")
        })
    })
}

function deleteComment(id, token, name, comment_id){
    return new Promise((resolve, reject) => {
        const queryData = `delete from Comment where comment_id = ${comment_id}`
        db.query(queryData, (error) => {
            if(error){
                logger.error(
                    'DB error [comment 수정] => ' + token + ' 소유자 ' + name + ' [user_id : ' + id + ' ]'+
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve("성공")
        })
    })
}

module.exports = {
    postComment,
    putComment,
    deleteComment
}