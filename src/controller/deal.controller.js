const DealService = require('../service/deal.service');
const logger = require('../config/logger');
const jwt = require('../module/jwt');

//get_list_deal_controller
async function getListDeal(req, res, next) {
    try {
        const getListDeal_req = req.query;
        const getListDeal_data = await DealService.getListDeal(getListDeal_req);
        return res.status(getListDeal_data.Status).json(getListDeal_data);
    } catch (err){
        logger.error(
            err
        )
    console.log("get_deal 실패");
    }
}

//post_deal_controller
async function postDeal(req, res, next) {
    try{
        const jwt_token = req.headers.jwt_token
        const token = await jwt.verify(jwt_token)
        const postDeal_req = req.body;
        const postDeal_img_req = req.files;
        const postDeal_data = await DealService.postDeal(token.IDX, postDeal_req, postDeal_img_req);
        return res.json(postDeal_data)
    } catch (err){
            logger.error(
                err
            )
        console.log("post_deal 실패");
    }
}

//put_deal_controller
async function putDeal(req, res, next) {
    try {
        const putDeal_req = req.body;
        const putDeal_img_req = req.files;
        const putDeal_data = await DealService.putDeal(putDeal_req, putDeal_img_req);
        console.log('수정 완료?!!');
        return res.status(putDeal_data.Status)  //이게 맞나..?
    } catch (err){
        logger.error(
            err
        )
        console.log("put_deal 실패");
    }
}

module.exports = {
    getListDeal, postDeal, putDeal
}