const LoginService = require('../service/login.service')

async function getLogin(req, res, next){
    const access_token = req.query.access_token
    console.log(req.query)
    console.log(access_token)
    const getlogin_data = await LoginService.getLogin(access_token)
    return res.status(getlogin_data.Status).json(getlogin_data)
}

async function postLogin(req, res, next){
    const {user_name, profile_img, access_token} = req.body
    const parameter = {
        name : user_name,
        img : profile_img,
        token : access_token
    }
    console.log(req.body)
    console.log(parameter)
    const postlogin_data = await LoginService.postLogin(parameter)
    return res.status(postlogin_data.Status).json(postlogin_data)
}

module.exports = {
    getLogin,
    postLogin
}