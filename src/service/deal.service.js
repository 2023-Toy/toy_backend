const dealDao = require('../DAO/deal.dao')

async function postDeal(postDeal_req) {
    try {
        if(!postDeal_req) {
            return {
                "Message" : "body data가 없습니다.",
                "Status" : 406
            }
        }
        const postDeal_data = await dealDao.postDeal(postDeal_req);
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : postDeal_data
        }
    } catch(err) {
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }
}

module.exports = {
    postDeal
}