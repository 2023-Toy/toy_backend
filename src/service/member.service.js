const memberDAO = require('../DAO/member.dao')
const fs = require("fs")
const logger = require('../config/logger')

async function getProfile(IDX) {
    try{
        if(!IDX){
            return{
                "Message" : "user_id가 없습니다.",
                "Status" : 406
            }
        }
        const profile_data = await memberDAO.getProfile(IDX)
        return{
            "Message": "성공",
            "Status": 200,
            "Data": profile_data
        }
    }catch (e){
        return{
            "Message": "실패",
            "Status": 400,
            "Error_Message": e
        }
    }
}

async function updateName(IDX, name){
    try{
        if(!IDX){
            return{
                "Message" : "user_id가 없습니다.",
                "Status" : 406
            }
        }
        await memberDAO.updateName(IDX, name)
        return{
            "Message": "성공",
            "Status": 200,
        }
    }catch (e){
        return{
            "Message": "실패",
            "Status": 400,
            "Error_Message": e
        }
    }
}

async function updateImg(IDX, file_name){
    try{
        if(!IDX){
            return{
                "Message" : "user_id가 없습니다.",
                "Status" : 406
            }
        }
        const user_data = await memberDAO.getProfile(IDX)
        if(!user_data){
            return {
                "Message":"존재하지 않는 user_id 입니다.",
                "Status":400
            }
        }
        await memberDAO.updateImg(IDX, file_name)
        if(user_data[0].profile_img !== "profile/default.jpg" && user_data[0].profile_img !== "profile/default.png"){
            try{
                fs.unlinkSync("src/public/images/"+user_data[0].profile_img)
            }catch (e){
                logger.error(
                    'File Error [파일 삭제] > \t'+e+"실패\n"
                )
            }
        }
        return{
            "Message": "성공",
            "Status": 200,
        }
    }catch (e){
        return{
            "Message": "실패",
            "Status": 400,
            "Error_Message": e
        }
    }
}

async function getRecent(deal_id){
    try{
        const recent_data = await memberDAO.getRecent(deal_id)
        return{
            "Message": "성공",
            "Status": 200,
            "Data": recent_data
        }
    }catch (e){
        return{
            "Message": "실패",
            "Status": 400,
            "Error_Message": e
        }
    }
}

async function getHeart(IDX){
    try{
        if(!IDX){
            return{
                "Message" : "user_id가 없습니다.",
                "Status" : 406
            }
        }
        const heart_data = await memberDAO.getHeart(IDX)
        return{
            "Message": "성공",
            "Status": 200,
            "Data": heart_data
        }
    }catch (e){
        return{
            "Message": "실패",
            "Status": 400,
            "Error_Message": e
        }
    }
}

module.exports = {
    getProfile,
    updateName,
    updateImg,
    getRecent,
    getHeart
}