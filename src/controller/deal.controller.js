const DealService = require('../service/deal.service');

async function postDeal(req, res, next) {
    try{
        const postDeal_req = req.body;
        // console.log("1.", req.query);
        // console.log("2.", req.body);  확인 작업
        const postDeal_data = await DealService.postDeal(postDeal_req);
        
        return res.json(postDeal_data)
    } catch (err){
        console.log("post_deal 실패");
    } finally {
        console.log("post_deal 부분임");
    }

}

module.exports = {
    postDeal
}