const db = require('../config/db')
const logger = require('../config/logger')

function postDeal(postDeal_req) {
    postdeal(postDeal_req);
    postdeal_img(postDeal_req.user_id);
}

function postdeal(postDeal_req) {
    
    return new Promise((resolve, reject) => {
        var queryData = `insert into
        user_id, deal_name, deal_content, deal_maintag, deal_type, deal_way, deal_price, deal_damage, deal_state, deal_caution, is_m, start_age, end_age, gender
        values (${postDeal_req.user_id}, ${postDeal_req.deal_name}, ${postDeal_req.deal_content}, ${postDeal_req.deal_maintag}, ${postDeal_req.deal_type},
        ${postDeal_req.deal_way}, ${postDeal_req.deal_price}, ${postDeal_req.deal_damage}, ${postDeal_req.deal_state}, ${postDeal_req.deal_caution},
        ${postDeal_req.is_m}, ${postDeal_req.start_age}, ${postDeal_req.end_age}, ${postDeal_req.gender})`;
        `select deal_id from deal where user_id = ${postDeal_req.user_id} and deal_name = "${postDeal_req.deal_name}"
         and deal_content = "${postDeal_req.deal_content}"`

        db.query(queryData, (error, db_data) => { //??
            if(error) {
                logger.error(
                    'DB error [deal]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            console.log(resolve.insertId)
            resolve(db_data)
        })
    })
}

function postdeal_img(postDeal_userid) {
    return new Promise((resolve, reject) => {
        

    })
}

module.exports = {
    postDeal
}