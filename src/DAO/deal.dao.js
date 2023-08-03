const db = require('../config/db')
const logger = require('../config/logger')
var user_id, deal_id;

//get_list_deal_dao -> tag, image_path, like, search_count
async function getlistDeal(getlistDeal_req) {
    console.log("확인", getlistDeal_req.deal_search_name);
    return new Promise((resolve, reject) => {
        var queryData = `select deal_name, deal_maintag, deal_price, deal_damage, deal_state
        from deal where deal_name like concat('%', '${getlistDeal_req.deal_search_name}', '%')`
        //var queryData_like = `select * from like l where l.user_id = ${getlistDeal_req.user_id} and l.deal_id = ${getlistDeal_req.deal_id}`
//        (select count(*) from deal where  deal_name like concat('%', '${getlistDeal_req.deal_search_name}', '%')) as 'deal_search_count' 
        db.query(queryData, (error, db_data) => {
            if(error) {
                logger.error(
                    'DB error [deal]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            console.log("추가 전", db_data);
            
            //const deal_like = queryData_like != undefined ? 1 : 0
            //db_data.deal_like = queryData_like;
            //console.log("추가 후", db_data);
            resolve(db_data)
        })
    })
}

//post_deal_dao
async function postDeal(postDeal_req, postDeal_img_req) {
    await postdeal_insert(postDeal_req);
    postdeal_img(postDeal_img_req);
    return deal_id
}

//post_deal
function postdeal_insert(postDeal_req) {
    user_id = postDeal_req.user_id;
    return new Promise((resolve, reject) => {
        var queryData = `insert into deal(
        user_id, deal_name, deal_content, deal_maintag, deal_type, deal_way, deal_price, 
        deal_damage, deal_state, deal_caution, is_m, start_age, end_age, gender)
        value (${postDeal_req.user_id}, '${postDeal_req.deal_name}', '${postDeal_req.deal_content}', 
        '${postDeal_req.deal_maintag}', '${postDeal_req.deal_type}', '${postDeal_req.deal_way}', 
        ${postDeal_req.deal_price}, ${postDeal_req.deal_damage}, '${postDeal_req.deal_state}', '${postDeal_req.deal_caution}',
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
            deal_id = db_data.insertId;
            logger.info(
                'post_deal Success ▶\t' + 'user_id : ' + user_id + ', deal_id : ' + deal_id + " 성공\n"
            )
            console.log("postdeal_id", deal_id);
            resolve(deal_id)
        })
    })
}
//post_deal_img -> 더 간단하게 할 수 있지 않을까 ,,
function postdeal_img(postDeal_img_req) {
    try{
        console.log("deal_dao", postDeal_img_req);
        const filenames = postDeal_img_req;
        const img_length = filenames.length;
        console.log(img_length);
        const img_name = new Array();
        for (let i=0; i<img_length; i++) {
            img_name[i] = filenames[i].filename;
            var queryData = `insert into deal_image(deal_id, deal_img_path) values (${deal_id}, '/deal/${img_name[i]}')`
            db.query(queryData, (error, db_data) => {
                if(error) {
                    logger.error(
                        'DB error [deal]' +
                        '\n \t' + queryData +
                        '\n \t' + error
                )}
                logger.info(
                    'post_deal_img Success ▶\t' + 'user_id : ' + user_id + ', deal_id : ' + deal_id + " 성공\n"
                )
                console.log("deal 이미지 db 저장 성공!");
            })
        }
    } catch (err){
            logger.error(
                err
            )
        console.log("deal 이미지 db 저장 실패");
    }
}

//put_deal_dao
//image랑 한번에 처리할 수 있을까 ,,,,,,,,
//수정한 부분만 받아서 하기.... -> 아예 안넘어오는건지, null로 넘어오는건지
function putDeal(putDeal_req, putDeal_img_req) {
    user_id = putDeal_req.user_id;
    deal_id = putDeal_req.deal_id;
    return new Promise((resolve, reject) => {
        var queryData = `update deal, deal_image set deal_name = '${putDeal_req.deal_name}', deal_content = '${putDeal_req.deal_content}, 
        deal_maintag = '${putDeal_req.deal_maintag}, deal_type = '${putDeal_req.deal_type}, deal_way = '${putDeal_req.deal_way}, 
        deal_price = ${putDeal_req.deal_price}, deal_damage = ${putDeal_req.deal_damage}, deal_state = '${putDeal_req.deal_state}', 
        deal_caution = '${putDeal_req.deal_caution}, is_m = ${putDeal_req.is_m}, start_age = ${putDeal_req.start_age}, 
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
                'put_deal Success ▶\t' + 'user_id : ' + user_id + ', deal_id : ' + deal_id + " 성공\n"
            )
            resolve(db_data)
        })
    })
}

module.exports = {
    getlistDeal, postDeal, putDeal
}