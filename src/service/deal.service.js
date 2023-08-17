const dealDao = require('../DAO/deal.dao')
const fs = require("fs")

//get_list_deal_service
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
            const tags = await dealDao.getDeal_tag(element.deal_id);
            element.tag_name = tags.map(tag => tag.tag_name);
        }
        for(const element of getListDeal_data) {
            const image = await dealDao.getListDeal_img(element.deal_id);
            element.deal_img_path = image.map(img => img.deal_img_path);
        }
        const deal_search_count = Number(Object.keys(getListDeal_data).at(-1)) + 1;
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : {
                "data" : getListDeal_data,
                "search_count" : deal_search_count
        }}
    } catch (err) {
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }
}
//get_deal_service
async function getDeal(getDeal_req) {
    try {
        if(!getDeal_req) {
            return {
                "Message" : "요청 값이 없습니다.",
                "Status" : 406
            }
        }
        const id = await dealDao.findDeal(getDeal_req)
        if(id=="empty"){
            return {
                "Message" : "존재하지 않는 deal_id 입니다.",
                "Status" : 400
            }
        }
        const getDeal_data = await dealDao.getDeal(id);
        for (const element of getDeal_data) {
            const tags = await dealDao.getDeal_tag(id);
            element.tag_name = tags.map(tag => tag.tag_name);
        }
        for(const element of getDeal_data) {
            const image = await dealDao.getDeal_img(id);
            element.deal_img_path = image.map(img => img.deal_img_path);
        }
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : getDeal_data
        }
    } catch(err) {
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

//delete_deal_service
async function deleteDeal(idx, deleteDeal_req) {
    try {
        if(!idx || !deleteDeal_req) {
            return {
                "Message" : "요청 값이 없습니다.",
                "Status" : 406
            }
        }
        const id = await dealDao.findDeal(deleteDeal_req)
        if(id=="empty"){
            return {
                "Message" : "존재하지 않는 deal_id 입니다.",
                "Status" : 400
            }
        }
        const delete_img_data = await dealDao.findDealImg(id)
        //deal_id 존재, image 존재X => 예외처리 필요? 
        // if(delete_img_data=="empty"){
        //     return {
        //         "Message" : "이미지가 없습니다.",
        //         "Status" : 400
        //     }
        // }
        for(var i=0; i<delete_img_data.length; i++) {
            fs.unlinkSync("src/public/images/" + delete_img_data[i].deal_img_path)
        }
        await dealDao.deleteDeal(idx, id)
        return {
            "Message" : "성공",
            "Status" : 200
        }
    } catch(err) {
        return {
            "Message" : "실패",
            "Status" : 406,
            "Error_Message" : err
        }
    }
}

//put_deal_service
async function putDeal(idx, deal_id, putDeal_req, putDeal_img_req) {
    try {
        if (!idx || !deal_id || !putDeal_req || !putDeal_img_req) {
            return {
                "Message" : "data가 없습니다.",
                "Status" : 406
            }
        }
        const id = await dealDao.findDeal(deal_id)
        if(id=="empty"){
            return {
                "Message" : "존재하지 않는 deal_id 입니다.",
                "Status" : 400
            }
        }
        const put_img_data = await dealDao.findDealImg(id)
        for(var i=0; i<put_img_data.length; i++) {
            fs.unlinkSync("src/public/images/" + put_img_data[i].deal_img_path)
        }
        await dealDao.putDeal_img(id);  //image 삭제
        const putDeal_data = await dealDao.putDeal(id, putDeal_req);
        await dealDao.postDeal_img(idx, putDeal_img_req, id);
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
//put_state_deal_service
async function putStateDeal(deal_id, deal_state) {
    try {
        if(!deal_id || !deal_state) {
            return {
                "Message" : "data가 없습니다.",
                "State" : 406
            }
        }
        const id = await dealDao.findDeal(deal_id)
        if(id=="empty"){
            return {
                "Message" : "존재하지 않는 deal_id 입니다.",
                "Status" : 400
            }
        }
        const putStateDeal_data = await dealDao.putStateDeal(id, deal_state);
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : putStateDeal_data
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
    getListDeal, getDeal, postDeal, deleteDeal, putDeal, putStateDeal
}