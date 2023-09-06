const dealDao = require('../DAO/deal.dao')
const lodash = require("lodash")
const fs = require("fs")

//get_main_service
async function getMain(getMain_req, baby_birthday, is_month) {
    var baby_age;
    var baby = new Date(baby_birthday);
    var baby_year = baby.getFullYear();
    var today = new Date();
    var year = today.getFullYear();
    var getMain_data;
    var getMain_r_data;
    try {
        if(!getMain_req || !baby_birthday || !is_month) {
            return {
                "Message" : "요청 값이 없습니다.",
                "Status" : 406
            }
        }
        if(is_month == 1) {  // 개월 수
            var difference= Math.abs(today - baby);
            days = difference/(1000 * 3600 * 24)
            var baby_ages = days / 30;
            baby_age = parseInt(baby_ages);
            getMain_data = await dealDao.getMain(baby_age, getMain_req);
        }
        else {  // 년 수
            baby_age = year - baby_year + 1;
            console.log("년수", baby_age)
            getMain_data = await dealDao.getMain(baby_age, getMain_req);
        }
        for(const element of getMain_data) {  // image 처리
            const image = await dealDao.getListDeal_img(element.deal_id);
            element.deal_img_path = image.map(img => img.deal_img_path);
        }
        const getMain_count = 10-(Number(Object.keys(getMain_data).at(-1)) + 1);
        //중복 제거 해줘야함;;;; 방법은 찾았는데 데이터 두 개를 합쳐야 함..
        if(getMain_count<10) {
            getMain_r_data = await dealDao.getMain_r(getMain_count, getMain_req);
            for(const element of getMain_r_data) {  // image 처리
                const image = await dealDao.getListDeal_img(element.deal_id);
                element.deal_img_path = image.map(img => img.deal_img_path);
            }
            for(const element of getMain_data) {
                console.log("어떻게나올까요....")
            }
        }
        _.uniqBy(getMain_data, "deal_id");
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : getMain_data
        }
    }
    catch (err) {
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }
}

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
            fs.unlinkSync("src/public/images" + delete_img_data[i].deal_img_path)
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
            fs.unlinkSync("src/public/images" + put_img_data[i].deal_img_path)
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
   getMain, getListDeal, getDeal, postDeal, deleteDeal, putDeal, putStateDeal
}