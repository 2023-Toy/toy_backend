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

module.exports = {
    findTag
}