const dealDao = require('../DAO/deal.dao')

//get_list_deal
async function getListDeal(getListDeal_req) {
    try {
        if(!getListDeal_req) {
            return {
                "Message" : "검색할 내용이 없습니다.",
                "Status" : 406
            }
        }
        const getListDeal_data = await dealDao.getListDeal(getListDeal_req);
        if(getListDeal_data == "empty") {
            return {
                "Message" : "검색 결과가 없습니다.",
                "Status" : 400
            }
        }
        for (const element of getListDeal_data) {
            const tags = await dealDao.getListDeal_tag(element.deal_id);
            element.tag_name = tags.map(tag => tag.tag_name);
        }
        for(const element of getListDeal_data) {
            const image = await dealDao.getListDeal_img(element.deal_id);
            element.deal_img_path = image.map(img => img.deal_img_path);
        }
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : getListDeal_data
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
async function postDeal(idx, postDeal_req, postDeal_img_req) {
    try {
        if(!idx || !postDeal_req || !postDeal_img_req) {
            return {
                "Message" : "요청 값이 없습니다.",
                "Status" : 406
            }
        }
        const postDeal_id = await dealDao.postDeal(idx, postDeal_req);
        await dealDao.postDeal_img(idx, postDeal_img_req, postDeal_id);
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : postDeal_id
        }
    } catch(err) {
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }
}

//put_deal_service -> 미완이요
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