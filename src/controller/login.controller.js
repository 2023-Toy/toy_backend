const LoginService = require('../service/login.service')
const jwt = require('../module/jwt')

async function getLogin(req, res, next) {
    const jwt_token = req.headers.jwt_token
    const token = await jwt.verify(jwt_token)
    const getLogin_data = await LoginService.getLogin(token.ACCESS_TOKEN)
    return res.status(getLogin_data.Status).json(getLogin_data)
}

async function postLogin(req, res, next) {
    const jwt_token = req.headers.jwt_token
    const token = await jwt.verify(jwt_token)
    const {user_name, user_age} = req.body
    const profile_img = req.file !== undefined ? "profile/" + req.file.filename : "profile/default.jpg"
    const parameter = {
        name: user_name,
        age: user_age,
        img: profile_img,
        token: token.ACCESS_TOKEN
    }
    const postLogin_data = await LoginService.postLogin(parameter)
    return res.status(postLogin_data.Status).json(postLogin_data)
}

async function deleteLogin(req, res, next) {
    const jwt_token = req.headers.jwt_token
    const token = await jwt.verify(jwt_token)
    const deleteLogin_data = await LoginService.deleteLogin(token.IDX)
    return res.status(deleteLogin_data.Status).json(deleteLogin_data)
}

module.exports = {
    getLogin,
    postLogin,
    deleteLogin
}