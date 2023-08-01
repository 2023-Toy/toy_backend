const LoginService = require('../service/login.service')

async function getLogin(req, res, next){
    const access_token = req.query.access_token
    console.log(req.query)
    const getlogin_data = await LoginService.getLogin(access_token)
    return res.status(getlogin_data.Status).json(getlogin_data)
}

async function postLogin(req, res, next){
    console.log(req.body)
    console.log(req.file)
    const {user_name, user_age, access_token} = req.body
    const profile_img = req.file.originalname
    console.log(req.file.filename)
    console.log(profile_img)
    const parameter = {
        name : user_name,
        age : user_age,
        img : profile_img,
        token : access_token
    }
    console.log(parameter)
    //const postlogin_data = await LoginService.postLogin(parameter)
    const postlogin_data = {
        "Message" : "test",
        "Status" : 200
    }
    return res.status(postlogin_data.Status).json(postlogin_data)
}

module.exports = {
    getLogin,
    postLogin
}