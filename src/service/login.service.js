const loginDao = require('../DAO/login.dao')
const fs = require("fs")
const logger = require('../config/logger')
const sign = require('../module/jwt').sign

async function getLogin(id){
    try{
        const login_data = await loginDao.getLogin(id)
        return {
            Message : "성공",
            Statu : 200,
            Data : login_data
        }
    }catch(err){
        return {
            Message : "실패",
            Status : 400,
            Error : err
        }
    }

}

async function postLogin(parameter){
    try{
        if(!parameter.name || !parameter.age || !parameter.token){
            return{
                Message : "요청값이 없습니다.",
                Status : 406
            }
        }
        const id = await loginDao.postLogin(parameter)
        const user = {
            "id" : id,
            "token" : parameter.token
        }
        const jwt_token = await sign(user)
        return {
            Message : "성공",
            jwt_token : jwt_token,
            Status : 200,
        }
    }
    catch(err){
        return {
            Message : "실패",
            Status : 400,
            Error : err
        }
    }
}

async function deleteLogin(id){
    try{
        if(!id){
            return {
                Message : "user_id가 없습니다.",
                Status : 406
            }
        }
        const login_data = await loginDao.findUser(id);
        if(!login_data){
            return {
                Message : "존재하지 않는 user 입니다.",
                Status : 400
            }
        }
        await loginDao.deleteLogin(id)
        if(login_data.profile_img != "profile/default.jpg" || login_data.profile_img != "profile/default.png"){
            try{
                logger.info(
                    'File Success [파일 삭제] ▶\t' + login_data.profile_img + " 삭제 성공\n"
                )
                fs.unlinkSync("src/public/images/" + login_data.profile_img)
            }
            catch(err){
                logger.error(
                    'File Error [파일 삭제] ▶\t' + err + " 실패\n"
                )
            }
        }
        return {
            Message : "성공",
            Status : 200
        }
    }
    catch(err){
        return {
            Message : "실패",
            Status : 400,
            Error : err
        }
    }
}


module.exports = {
    getLogin,
    postLogin,
    deleteLogin
}