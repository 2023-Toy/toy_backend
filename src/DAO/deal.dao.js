const db = require('../config/db')
const logger = require('../config/logger')

//get_list_deal_dao
async function getListDeal(getlistDeal_req) {
    return new Promise((resolve, reject) => {
        var queryData = `SELECT d.deal_id, deal_name, deal_maintag, deal_price, deal_damage,
        if(h.user_id = d.user_id AND h.deal_id = d.deal_id, 1, 0) as deal_like 
        FROM heart h, deal d
        WHERE deal_name LIKE CONCAT('%', '${getlistDeal_req.deal_search_name}', '%') OR
        deal_content LIKE CONCAT('%', '${getlistDeal_req.deal_search_name}', '%')`
        db.query(queryData, (error, db_data) => {
            if(error) {
                logger.error(
                    'DB error [deal]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            if(!db_data.length){
                logger.error(
                    'Not DB [deal]' +
                    '\n \t' + "Not DB data"
                )
                db_data = "empty"
            }
            resolve(db_data)
        })
    })
}
async function getListDeal_img(deal_id) {
    return new Promise((resolve, reject) => {
        var queryData = `SELECT deal_img_path
        FROM deal_image i INNER JOIN deal d ON d.deal_id = i.deal_id
        WHERE i.deal_id = ${deal_id}
        LIMIT 1`
        db.query(queryData, (error, db_data) => {
            if(error) {
                logger.error(
                    'DB error [deal_image]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve(db_data)
        })
    })
}
async function getDeal_tag(deal_id) {
    return new Promise((resolve, reject) => {
        var queryData = `SELECT t.tag_name
        FROM deal_tag dt
        JOIN tag t ON t.tag_id = dt.fk_deal_tag_id
        WHERE dt.fk_deal_id = ${deal_id}`
        db.query(queryData, (error, db_data) => {
            if(error) {
                logger.error(
                    'DB error [deal_tag]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve(db_data)
        })
    })
}
//get_deal_dao
async function getDeal(getDeal_req) {
    return new Promise((resolve, reject) => {
        var queryData = `SELECT * FROM deal WHERE deal_id = ${getDeal_req}`
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
async function getDeal_img(deal_id) {  //getListDeal_img 랑 너무 비슷한데 하나로 안될까
    return new Promise((resolve, reject) => {
        var queryData = `SELECT deal_img_path
        FROM deal_image i INNER JOIN deal d ON d.deal_id = i.deal_id
        WHERE i.deal_id = ${deal_id}`
        db.query(queryData, (error, db_data) => {
            if(error) {
                logger.error(
                    'DB error [deal_image]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve(db_data)
        })
    })
}

//post_deal_dao
function postDeal(idx, postDeal_req) {
    return new Promise((resolve, reject) => {
        var queryData = `insert into deal(
        user_id, deal_name, deal_content, deal_maintag, deal_type, deal_way, deal_price, 
        deal_damage, deal_state, deal_caution, is_m, start_age, end_age, gender)
        value (${idx}, '${postDeal_req.deal_name}', '${postDeal_req.deal_content}', '${postDeal_req.deal_maintag}', 
        '${postDeal_req.deal_type}', '${postDeal_req.deal_way}', ${postDeal_req.deal_price}, 
        ${postDeal_req.deal_damage}, '${postDeal_req.deal_state}', '${postDeal_req.deal_caution}',
        ${postDeal_req.is_m}, ${postDeal_req.start_age}, ${postDeal_req.end_age}, ${postDeal_req.gender})`;
        db.query(queryData, (error, db_data) => {
            if(error) {
                logger.error(
                    'DB error [deal]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            var deal_id = db_data.insertId;
            logger.info(
                'post_deal Success ▶\t' + 'user_id : ' + idx + ', deal_id : ' + deal_id + " 성공\n"
            )
            resolve(deal_id)
        })
    })
}
function postDeal_img(idx, postDeal_img_req, postDeal_id) {  //음..
    try{
        const filenames = postDeal_img_req;
        const img_length = filenames.length;
        console.log("길이", img_length);
        const img_name = new Array();
        for (let i=0; i<img_length; i++) {
            img_name[i] = filenames[i].filename;
            var queryData = `insert into deal_image(deal_id, deal_img_path) values (${postDeal_id}, '/deal/${img_name[i]}')`
            db.query(queryData, (error, db_data) => {
                if(error) {
                    logger.error(
                        'DB error [deal]' +
                        '\n \t' + queryData +
                        '\n \t' + error
                )}
            })
        } logger.info(
            'post_deal_img Success ▶\t' + 'user_id : ' + idx + ', deal_id : ' + postDeal_id + " 성공\n"
        )
    } catch (err){
            logger.error(
                'DB error [deal_image]' +
                '\n \t' + err
            )
    }
}

//put_deal_dao -> 미완이요
function putDeal(putDeal_req, putDeal_img_req) {
    deal_id = putDeal_req.deal_id;
    return new Promise((resolve, reject) => {
        var queryData = `update deal, deal_image set deal_name = '${putDeal_req.deal_name}', deal_content = '${putDeal_req.deal_content}', 
        deal_maintag = '${putDeal_req.deal_maintag}', deal_type = '${putDeal_req.deal_type}', deal_way = '${putDeal_req.deal_way}', 
        deal_price = ${putDeal_req.deal_price}, deal_damage = ${putDeal_req.deal_damage}, deal_state = '${putDeal_req.deal_state}', 
        deal_caution = '${putDeal_req.deal_caution}', is_m = ${putDeal_req.is_m}, start_age = ${putDeal_req.start_age}, 
        end_age = ${putDeal_req.end_age}, gender = ${putDeal_req.gender}')
        where deal_id = ${putDeal_req.deal_id}`;

        db.query(queryData, (error, db_data) => {
            if(error) {
                logger.error(
                    'DB error [deal]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            logger.info(
                'put_deal Success ▶\t' + 'deal_id : ' + deal_id + " 성공\n"
            )
            resolve(db_data)
        })
    })
}

module.exports = {
    getListDeal, getListDeal_img, getDeal_tag, getDeal, getDeal_img, postDeal, postDeal_img, putDeal
}