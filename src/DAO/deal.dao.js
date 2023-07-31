const db = require('../config/db')
const logger = require('../config/logger')

function postDeal(postDeal_req) {
    return new Promise((resolve, reject) => {
        var queryData = `select deal_id from deal where user_id = ${postDeal_req.user_id} and deal_name = "${postDeal_req.deal_name}" and deal_content = "${postDeal_req.deal_content}"`;
        db.query(queryData, (error, db_data) => {
            if(error) {
                logger.error(
                    'DB error [deal]' +
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
    postDeal
}