const CommunityService = require('../service/community.service')

async function postCommunity(req, res, next){
    const community_title = req.query.community_title;
    const community_content = req.query.community_content;
    console.log(req.query)
    console.log(community_title)
    console.log(community_content)
    const postCommunity_data = await CommunityService.postCommunity(community_title, community_content);
    return res.status(postCommunity_data.Status).json(postCommunity_data)
}

async function deleteCommunity(req, res, next){
    const community_id = req.query.community_id;
    console.log(req.query)
    console.log(community_id)
    const deleteCommunity_data = await CommunityService.deleteCommunity(community_id);
    return res.status(deleteCommunity_data.Status).json(deleteCommunity_data)
}

async function updateCommunity(req, res, next){
    const community_id = req.query.community_id;
    const community_title = req.query.community_title; 
    const community_content = req.query.community_content;
    console.log(req.query)
    console.log(community_id)
    console.log(community_title)
    console.log(community_content)
    const updateCommunity_data = await CommunityService.updateCommunity(community_id, community_title, community_content);
    return res.status(updateCommunity_data.Status).json(updateCommunity_data)
}

async function getCommunity(req, res, next){
    const community_search = req.query.community_search;
    console.log(req.query)
    console.log(community_search)
    const getCommunity_data = await CommunityService.getCommunity(community_search);
    return res.status(getCommunity_data.Status).json(getCommunity_data)
}

async function viewCommunity(req, res, next){
    const community_search = req.query.community_search;
    console.log(req.query)
    console.log(community_search)
    const getCommunity_data = await CommunityService.getCommunity(community_search);
    return res.status(getCommunity_data.Status).json(getCommunity_data)
}

module.exports = {
    postCommunity,
    deleteCommunity,
    updateCommunity,
    getCommunity,
    viewCommunity
  };