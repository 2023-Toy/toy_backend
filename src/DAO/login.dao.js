const db = require('../config/db')
const logger = require('../config/logger')

function getLogin(id){
    return new Promise((resolve, reject) => {
        var queryData = `select * from user where user_id =${id}`;
        db.query(queryData, (error, db_data) => {
            if(error){
                logger.error(
                    'DB error [user]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            if(!db_data.length){
                logger.info(
                    'Not DB [user]' +
                    '\n \t' + "Not access_token"
                )
                db_data = "is_new"
            }
            else{
                logger.info(
                '로그인 success\t' + db_data[0].user_name + " 성공\n"
                )
            }
            resolve(db_data)
        })
    })
}

function postLogin(parameter){
    return new Promise((resolve, reject) => {
        var queryData = `insert into user(user_name, user_age, profile_img, access_token)
        value('${parameter.name}', ${parameter.age}, '${parameter.img}', '${parameter.token}')`
        db.query(queryData, (error, db_data) => {
            if(error){
                logger.error(
                    'DB error [user]'+
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            logger.info(
                '회원가입 Success ▶\t' + parameter.name + " 성공\n"
            )
            resolve(db_data.insertId)
        })
    })
}

function deleteLogin(parameter){
    return new Promise((resolve, reject) => {
        var queryData = `delete from user where user_id = ${parameter.id}`
        db.query(queryData, (error, db_data) => {
            if(error){
                logger.error(
                    'DB error [user]'+
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject('DB ERR')
            }
            logger.info(
                '회원 탈퇴 Success ▶\t' + parameter.name + " 성공\n"
            )
            resolve(db_data)
        })
    })
}

function findUser(id){
    return new Promise((resolve, reject) => {
        var queryData = `select user_name, profile_img from user where user_id = ${id}`
        db.query(queryData, (error, db_data) => {
            if(error){
                logger.error(
                    'DB error [user]'+
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject('DB ERR')
            }
            else if(!db_data){
                logger.error(
                    '회원 조회 Fail ▶\t user_id : ' + id + " 실패\n"
                )
            }
            else{
                logger.info(
                    '회원 조회 Success ▶\t' + db_data[0].user_name + " 성공\n"
                )
            }
            resolve(db_data[0])

        })
    })
}

module.exports = {
    getLogin,
    postLogin,
    deleteLogin,
    findUser
}