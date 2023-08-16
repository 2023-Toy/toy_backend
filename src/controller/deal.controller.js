const DealService = require('../service/deal.service');
const logger = require('../config/logger');
//login.contoroller parameter 이용해서 put 보낼 수 있지 않을까...

//get_list_deal_controller
async function getListDeal(req, res, next) {
    try {
        console.log("controller 넘어오는 값", req.query);
        const getlistDeal_req = req.query;
        const getlistDeal_data = await DealService.getListDeal(getlistDeal_req);
        return res.json(getlistDeal_data)
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
        const postDeal_req = req.body;
        const postDeal_img_req = req.files;
        
        //확인 작업
        console.log("controller 1.", req.body.user_id);
        console.log("controller 2.", req.files);
        const postDeal_data = await DealService.postDeal(postDeal_req, postDeal_img_req);
        console.log('upload!!!');
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
        console.log('edit!!!');
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