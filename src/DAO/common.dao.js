const db = require('../config/db');
const logger = require('../config/logger')

//사용자 이름 조회
function findName(id){
    return new Promise((resolve, reject) => {
        console.log("-----findName-----")
        var qeryData = `select user_name from \`user\` where user_id = ${id};`
        db.query(qeryData, (error, db_data) => {
            if(error){
                logger.error(
                    'DB error [user_name 조회]' +
                    '\n \t' + "시도한 id : " + id +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve(db_data[0].user_name)
        })
    })
}

//커뮤니티 게시글 작성자 조회
function findCommunityUser(id){
    return new Promise((resolve, reject) => {
        console.log("-----find Community User-----")
        var queryData = `select c.user_id from Community c where c.community_id = ${id};`
        db.query(queryData, (error, db_data) => {
            if(error){
                logger.error(
                    'DB error [community_user 조회]'+
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject(error)
            }
            resolve(db_data[0].user_id)
        })
    })
}

function findCommentUser(id){
    return new Promise((resolve, reject) => {
        console.log("-----find Comment User-----")
        var queryData = `select c.user_id from Comment c where c.Comment_id = ${id};`
        db.query(queryData, (error, db_data) => {
            if(error){
                logger.error(
                    'DB error [comment_user 조회]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject(error)
            }
            resolve(db_data[0].user_id)
        })
    })
}

//커뮤니티 태그 (카테고리) 조회
function findTag(id){
    return new Promise((resolve, reject) => {
        console.log("-----findTag-----")
        var queryData = `select ct.community_tag_id, t.tag_name from Community_tag ct
        join tag t on t.tag_id = ct.tag_id
        where ct.community_id = ${id};`
        db.query(queryData, (error, data) => {
            if(error){
                logger.error(
                    'DB error [community_tag 조회]'+
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject(error)
            }
            resolve(data)
        })
    })
}

module.exports = {
    findName,
    findTag,
    findCommunityUser,
    findCommentUser
}