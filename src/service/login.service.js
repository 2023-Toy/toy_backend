const loginDao = require('../DAO/login.dao')
const { param } = require('../app')

async function getLogin(access_token){
    try{
        if(!access_token){
            return{
                "Message" : "access_token이 없습니다.",
                "Status" : 406
            }
        }
        const login_data = await loginDao.getLogin(access_token)
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : login_data
        }
    }catch(err){
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }

}

async function postLogin(parameter){
    try{
        if(!parameter.name || !parameter.age || !parameter.token){
            return{
                "Message" : "요청값이 없습니다.",
                "Status" : 406
            }
        }
        const login_data = await loginDao.postLogin(parameter)
        return {
            "Message" : "성공",
            "Status" : 200,
        }
    }
    catch(err){
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }
}


module.exports = {
    getLogin,
    postLogin
}