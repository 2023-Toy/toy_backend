const db = require('../config/db');
const logger = require('../config/logger')

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

function putComment(id, comment_id, comment_content){

}

module.exports = {
    postComment,
    putComment
}