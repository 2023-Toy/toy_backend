const dealDao = require('../DAO/deal.dao')

//get_list_deal
async function getListDeal(getlistDeal_req) {
    try {
        if(!getlistDeal_req) {
            return {
                "Message" : "search data가 없습니다.",
                "Status" : 406
            }
        }
        const getlistDeal_data = await dealDao.getListDeal(getlistDeal_req);
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : getlistDeal_data
        }
    } catch (err) {
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }
}

//post_deal_service
async function postDeal(postDeal_req, postDeal_img_req) {
    try {
        if(!postDeal_req) {
            return {
                "Message" : "body data가 없습니다.",
                "Status" : 406
            }
        }
        if(!postDeal_img_req) {
            return {
                "Message" : "file data가 없습니다.",
                "Status" : 406
            }
        }
        const postDeal_data = await dealDao.postDeal(postDeal_req, postDeal_img_req);
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

async function putDeal(putDeal_req, putDeal_img_req) {
    try {
        if (!putDeal_req) {
            return {
                "Message" : "body data가 없습니다.",
                "Status" : 406
            }
        }
        if (!putDeal_img_req) {
            return {
                "Message" : "file data가 없습니다.",
                "Status" : 406
            }
        }
        const putDeal_data = await dealDao.putDeal(putDeal_req, putDeal_img_req);
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : putDeal_data
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
    getListDeal, postDeal, putDeal
}