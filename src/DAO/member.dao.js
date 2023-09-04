const db = require('../config/db')
const logger = require('../config/logger')

function getProfile(IDX){
    return new Promise((resolve, reject)=>{
        const queryData = `SELECT * FROM user WHERE user_id = ?`;
        db.query(queryData, [IDX], (err, db_data)=>{
            if(err) {
                logger.error(
                    'DB error [member]'+
                    '\n \t' + queryData +
                    '\n \t' + err
                )
                reject("DB ERR")
            }
            else if(!db_data || db_data.length === 0 ) {
                logger.error(
                    '프로필 조회 Fail > \t user_id : ' + IDX + "실패\n"
                )
                reject("no data")
            }
            else{
                logger.info(
                '회원 프로필 조회 Success > \t user_id :' + IDX + " 성공\n"
            )}
            resolve(db_data);
        });
    })
}


function updateName(user_id ,name){
    return new Promise((resolve, reject)=>{
        const queryData = `UPDATE user SET user_name = ? WHERE user_id = ?;`
        db.query(queryData, [name, user_id], (err, db_data)=>{
            if(err) {
                logger.error(
                    'DB error [member]'+
                    '\n \t' + queryData +
                    '\n \t' + err
                )
                reject("DB ERR")
            }
            logger.info(
                '이름변경 Success > \t' + user_id + ' 성공\n'
            )
            resolve(db_data)
        })
    })
}

function updateImg(user_id, profile_img){
    return new Promise((resolve, reject) => {
        const queryData = `UPDATE user SET profile_img = ? where user_id = ?;`
        db.query(queryData, [profile_img, user_id],(err, db_data) =>{
            if(err) {
                logger.error(
                    'DB error [member]'+
                    '\n \t' + queryData +
                    '\n \t' + err
                )
                reject("DB ERR")
            }
            logger.info(
                '사진변경 Success > \t' + user_id + ' 성공\n'
            )
            resolve(db_data)
        })
    })
}

function getRecent(deal_id){
    return new Promise((resolve, reject) =>{
        const queryData = `select d.deal_name, di.deal_img_path, d.deal_maintag, d.deal_type, d.deal_price from deal d left join deal_image di on d.deal_id = di.deal_id where d.deal_id = ? group by d.deal_id`
        db.query(queryData, [deal_id], (err, db_data)=>{
            if(err){
                logger.error(
                    'DB error [member]'+
                    '\n \t' + queryData +
                    '\n \t' + err
                )
                reject("DB ERR")
            }
            resolve(db_data)
        })
    })
}

function getHeart(IDX){
    return new Promise((resolve, reject)=>{
        const queryData = `select d.deal_id, d.deal_name, d.deal_price, di.deal_img_path from deal d left join heart h on d.deal_id = h.deal_id left join deal_image di on d.deal_id = di.deal_id where h.user_id = ? group by d.deal_id`
        db.query(queryData, [IDX], (err, db_data)=>{
            if(err){
                logger.error(
                    'DB error [member]'+
                    '\n \t' + queryData +
                    '\n \t' + err
                )
                reject("DB ERR")
            }

            resolve(db_data)
        })
    })
}
module.exports = {
    getProfile,
    updateName,
    updateImg,
    getRecent,
    getHeart
}