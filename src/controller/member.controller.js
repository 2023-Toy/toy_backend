const MemberService = require('../service/member.service')
const jwt = require('../module/jwt')
const {profile} = require("winston");
async function getProfile(req, res, next){
    const jwt_token = req.headers.jwt_token
    const token = await jwt.verify(jwt_token)
    const profile_data = await MemberService.getProfile(token.IDX)
    return res.status(profile_data.Status).json(profile_data)
}
async function updateName(req, res, next){
    const jwt_token = req.headers.jwt_token
    const token = await jwt.verify(jwt_token)
    const name = req.body.name
    const update_data = await MemberService.updateName(token.IDX, name)
    return res.status(update_data.Status).json(update_data)
}
async function updateImg(req, res, next){
    const jwt_token = req.headers.jwt_token
    const token = await jwt.verify(jwt_token)
    const file_name = req.file !== undefined ? "profile/"+req.file.filename : "profile/default.jpg"
    const update_data = await MemberService.updateImg(token.IDX, file_name)
    return res.status(update_data.Status).json(update_data)
}
async function getRecentList(req, res, next){
    const recentList = req.query.deals;
    const deal_List = recentList.split(',');
    var db_Data = [];
    for (const e of deal_List) {
        const recent_data = await MemberService.getRecent(e)
        db_Data.push(recent_data.Data[0])
    }
    return res.status(200).json({"Message":"성공",'Status':200,'Data':db_Data})

}
async function getHeartList(req, res, next){

}

module.exports = {
    getProfile,
    updateName,
    updateImg,
    getRecentList,
    getHeartList
}