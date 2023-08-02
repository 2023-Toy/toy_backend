const LoginService = require('../service/login.service')

async function getLogin(req, res, next){
    const access_token = req.query.access_token
    console.log(req.query)
    const getlogin_data = await LoginService.getLogin(access_token)
    return res.status(getlogin_data.Status).json(getlogin_data)
}

async function postLogin(req, res, next){
    const {user_name, user_age, access_token} = req.body
    const profile_img = req.file != undefined ? "profile/"+req.file.filename : "profile/default.jpg"
    const parameter = {
        name : user_name,
        age : user_age,
        img : profile_img,
        token : access_token
    }
    const postlogin_data = await LoginService.postLogin(parameter)
    return res.status(postlogin_data.Status).json(postlogin_data)
}

async function deleteLogin(req, res, next){
    const id = req.body.user_id
    const deletelogin_data = await LoginService.deleteLogin(id)
    return res.status(deletelogin_data.Status).json(deletelogin_data)
}

module.exports = {
    getLogin,
    postLogin,
    deleteLogin
}