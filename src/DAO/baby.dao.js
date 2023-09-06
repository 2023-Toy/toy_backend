const db = require('../config/db')
const logger = require('../config/logger')

//get_baby_dao
async function getBaby(idx, baby_id) {
    return new Promise((resolve, reject) => {
        var queryData = `select baby_name, baby_gender, baby_birthday from baby
        where baby_id = ${baby_id}`;
        db.query(queryData, (error, db_data) => {
            if(error) {
                logger.error(
                    'DB error [baby]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve(db_data)
        })
    })
}

//post_baby_dao -> 날짜
async function postBaby(idx, req) {
    return new Promise((resolve, reject) => {
        var date = req.baby_birthday;
        const newdate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
        var queryData = `insert into baby(user_id, baby_name, baby_gender, baby_birthday)
        value (${idx}, '${req.baby_name}', ${req.baby_gender}, '${newdate}')`;
        db.query(queryData, (error, db_data) => {
            if(error) {
                logger.error(
                    'DB error [baby]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            var baby_id = db_data.insertId;
            logger.info (
                'delete_baby Success ▶\t' + 'user_id : ' + idx + ", baby_id : " + baby_id + " 성공\n"
            )
            resolve(db_data)
        })
    })
}

//delete_baby_dao
async function deleteBaby(idx, baby_id) {
    return new Promise((resolve, reject) => {
        var queryData = `delete from baby where baby_id = ${baby_id}`;
        db.query(queryData, (error, db_data) => {
            if(error) {
                logger.error(
                    'DB error [baby]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            else {
                logger.info (
                    'delete_baby Success ▶\t' + 'user_id : ' + idx + ", baby_id : " + baby_id + " 성공\n"
                )
            }
            resolve(db_data)
        })
    })
}

//put_baby_dao -> 날짜
async function putBaby(idx, req, baby_id) {
    return new Promise((resolve, reject) => {
        var date = req.baby_birthday;
        const newdate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
        var queryData = `update baby set baby_name = '${req.baby_name}',
        baby_gender = ${req.baby_gender}, baby_birthday = '${newdate}'
        where baby_id = ${baby_id}`;
        db.query(queryData, (error, db_data) => {
            if(error) {
                logger.error(
                    'DB error [baby]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            else {
                logger.info (
                    'put_baby Success ▶\t' + 'user_id : ' + idx + ", baby_id : " + baby_id + " 성공\n"
                )
            }
            resolve(db_data)
        })
    })
}

module.exports ={
    getBaby, postBaby, deleteBaby, putBaby
}