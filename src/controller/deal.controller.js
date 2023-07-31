const DealService = require('../service/deal.service');

async function postDeal(req, res, next) {
    try{
        const postDeal_req = req.body;
        console.log("1.", req.query);
        console.log("2.", req.body);

        const postDeal_data = await DealService.postDeal(postDeal_req);
        return res.json(postDeal_data)
    } catch (err){
        console.log("실패..");
    } finally {
        console.log("ㅇㅅㅇ ㅠㅠ");
    }

}

module.exports = {
    postDeal
}