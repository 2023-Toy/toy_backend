const db = require('../config/db');
const logger = require('../config/logger')

function findTag(id){
    return new Promise((resolve, reject) => {
        console.log("findTag 들어옴")
        var queryData = `select t.tag_name from Community_tag ct
        join tag t on t.tag_id = ct.tag_id
        where ct.community_id = ${id};`
        db.query(queryData, (error, data) => {
            if(error){
                logger.error(
                    'DB error [community_tag]'+
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject(error)
            }
            console.log("반환값 : " , data)
            resolve(data)
        })
    })
}

function getMain(){
    return new Promise((resolve, reject) => {
        var queryData = `select c.community_id, c.community_title, c.community_content, count(community_image_id) as img_count, count(comment_id) as comment_count from Community c
        left join Comment c2 on c.community_id = c2.community_id
        left join Community_image ci on ci.community_id = c.community_id
        GROUP BY community_id 
        ORDER BY c.community_id desc
        limit 5;`
        db.query(queryData, (error, db_data) => {
            if(error){
                logger.error(
                    'DB error [community]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            console.log(db_data)
            resolve(db_data)
        })
    })
}

// 게시글 추가
function postCommunity(community_title, community_content) {
  return new Promise((resolve, reject) => {
    const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const queryData = `INSERT INTO community (community_title, community_content, community_date) VALUES ('${community_title}', '${community_content}', '${currentDateTime}')`;
    db.query(queryData, [community_title, community_content, currentDateTime], (error, db_data) => {
        if(error){
            logger.error(
                'DB error [user]' +
                '\n \t' + queryData +
                '\n \t' + error
            )
            reject("DB ERR")
        }
        resolve(db_data)
    })
})
}

// 게시글 삭제
function deleteCommunity(community_id) {
  return new Promise((resolve, reject) => {
    const queryData = `DELETE FROM community WHERE community_id = ${community_id}`;
    db.query(queryData, [community_id], (error, db_data) => {
        if(error){
            logger.error(
                'DB error [user]' +
                '\n \t' + queryData +
                '\n \t' + error
            )
            reject("DB ERR")
        }
        resolve(db_data)
    })
})
}

// 게시글 수정
function updateCommunity(community_id, community_title, community_content) {
  return new Promise((resolve, reject) => {
    const queryData = `UPDATE community SET community_title = ${community_title}, community_content = ${community_content}, WHERE community_id = ${community_id}`;
    db.query(queryData, [community_title, community_content, community_id], (error, db_data) => {
        if(error){
            logger.error(
                'DB error [user]' +
                '\n \t' + queryData +
                '\n \t' + error
            )
            reject("DB ERR")
        }
        resolve(db_data)
    })
})
}

  
module.exports = {
    getMain,
    postCommunity,
    deleteCommunity,
    updateCommunity,
    findTag
}