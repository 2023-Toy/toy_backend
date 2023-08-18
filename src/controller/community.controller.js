const CommunityService = require('../service/community.service')
const jwt = require("../module/jwt");

async function test(req, res, next) {
    const {key, value} = req.body
    const data = {
        k: key,
        v: value
    }
    console.log(key)
    return res.json(data)
}

async function getMain(req, res, next) {
    const getCommunity_data = await CommunityService.getMain()
    return res.status(getCommunity_data.Status).json(getCommunity_data)
}

async function getCommunity(req, res, next) {
    const getCommunity_data = await CommunityService.getCommunity()
    return res.status(getCommunity_data.Status).json(getCommunity_data)
}

async function getCommunityBoard(req, res, next) {
    const id = req.query.community_id
    const getCommunity_data = await CommunityService.getCommunityBoard(id)
    return res.status(getCommunity_data.Status).json(getCommunity_data)
}

async function getSearch(req, res, next) {
    const search = '%' + req.query.search_data + '%'
    const getCommunity_data = await CommunityService.getSearch(search)
    return res.status(getCommunity_data.Status).json(getCommunity_data)

}

async function postCommunity(req, res, next) {
    const jwt_token = req.headers.jwt_token
    const token = await jwt.verify(jwt_token)
    const {title, content, community_tag} = req.body
    let community_img = []
    if(req.files){
        community_img = req.files.map(file => file.filename)
    }
    const postCommunity_data = await CommunityService.postCommunity(token.IDX, token.ACCESS_TOKEN,title, content, community_img, community_tag)
    return res.status(postCommunity_data.Status).json(postCommunity_data)
}

async function putCommunity(req, res, next) {
    const jwt_token = req.headers.jwt_token
    const token = await jwt.verify(jwt_token)
    const {community_id, title, content, community_tag} = req.body
    const community_img = req.files.map(file => file.filename)
    const putCommunity_data = await CommunityService.putCommunity(token.IDX, token.ACCESS_TOKEN, community_id, title, content, community_img, community_tag)
    return res.status(putCommunity_data.Status).json(putCommunity_data)
}

async function deleteCommunity(req, res, next){
    const jwt_token = req.headers.jwt_token
    const token = await jwt.verify(jwt_token)
    const id = req.body.community_id
    const deleteCommunity_data = await CommunityService.deleteCommunity(token.IDX, token.ACCESS_TOKEN, id)
    return res.status(deleteCommunity_data.Status).json(deleteCommunity_data)
}


module.exports = {
    test,
    getMain,
    getCommunity,
    getCommunityBoard,
    getSearch,
    postCommunity,
    putCommunity,
    deleteCommunity
}