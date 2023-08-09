const jwt = require('../module/jwt')
const token_ex = -3 //토큰 만료
const token_in = -2 //유효하지 않은 토큰

const authUtil = {
    checkToken : async(req, res, next) => {
        var token = req.headers.jwt_token
        if(!token){
            return {
                "Message" : "token이 존재하지 않습니다.",
                "Status" : 400
            }
        }
        const jwt_token = await jwt.verify(token)
        if(jwt_token === token_ex){
            return {
                "Message" : "만료된 token 입니다.",
                "Status" : 400
            }
        }
        if(jwt_token === token_in){
            return {
                "Message" : "유효하지 않은 token 입니다.",
                "Status" : 400
            }
        }
        req.IDX = jwt_token.IDX
        next()
    }
}

module.exports = authUtil