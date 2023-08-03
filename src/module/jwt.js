const randToken = require('rand-token')
const jwt = require('jsonwebtoken')
const logger = require('../config/logger')
const secretKey = require('../config/secretkey').secretKey
const option = require('../config/secretkey').option
const token_ex = -3 //토큰 만료
const token_in = -2 //유효하지 않은 토큰

module.exports = {
    sign : async(user) => {
        const payload = {
            IDX : user.id,
            ACCESS_TOKEN : user.token
        }
        const result = {
            token : jwt.sign(payload, secretKey, option),
            refreshToken : randToken.uid(256)
        }
        return result
    },

    verify : async (token) => {
        let decoded;
        try{
            decoded = jwt.verify(token, secretKey)
        }
        catch (err){
            console.log(err)
            console.log(err.message)
            if(err.message === 'jwt expired'){
                logger.error(
                    [err.message] + ' ▶ ' + token.ACCESS_TOKEN
                )
                return token_ex
            }
            else if(err.message === 'invalid token'){
                logger.error(
                    [err.message] + ' ▶ ' + token.ACCESS_TOKEN
                )
                return token_in
            }
            else{
                logger.error(
                    [err.message] + ' ▶ ' + token.ACCESS_TOKEN
                )
                return token_in
            }
        }
        return decoded
    }
}