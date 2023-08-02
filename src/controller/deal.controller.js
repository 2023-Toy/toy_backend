const DealService = require('../service/deal.service');
const logger = require('../config/logger');

async function postDeal(req, res, next) {
    try{
        const postDeal_req = req.body;
        
        //확인 작업
        console.log("0.", postDeal_req);
        console.log("1.", req.body.user_id);
        console.log("2.", req.body);
        
        const postDeal_data = await DealService.postDeal(postDeal_req);
        console.log(req.files);
        console.log('upload!!!');
        return res.json(postDeal_data)
    } catch (err){
            logger.error(
                err
            )
        console.log("post_deal 실패");
    } finally {
        console.log("post_deal 부분임");
    }
}

module.exports = {
    postDeal
}