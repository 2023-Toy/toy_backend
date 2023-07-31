const communityDao = require('../DAO/community.dao')
const logger = require('../config/logger')

async function postCommunity(community_title, community_content){
    try{
        if(!community_title || !community_content){
            return{
                "Message" : "community_title이나 community_content이 없습니다.",
                "Status" : 406
            }
        }
        const community_data = await communityDao.postCommunity(community_title, community_content)
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : community_data
        }
    }catch(err){
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }

}

async function deleteCommunity(community_id){
    try{
        if(!community_id){
            return{
                "Message" : "community_id가 없습니다.",
                "Status" : 406
            }
        }
        const community_data = await communityDao.deleteCommunity(community_id)
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : community_data
        }
    }catch(err){
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }

}

async function updateCommunity(community_id, community_title, community_content){
    try{
        if(!community_id || !community_title || !community_content){
            return{
                "Message" : "community_id나 community_title, community_content가 없습니다.",
                "Status" : 406
            }
        }
        const community_data = await communityDao.updateCommunity(community_id, community_title, community_content)
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : community_data
        }
    }catch(err){
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }

}

async function getCommunity(community_search){
    console.log(community_search)
    try{
        if(!community_search){
            return{
                "Message" : "community_search가 없습니다.",
                "Status" : 406
            }
        }
        const community_data = await communityDao.getCommunity(community_search)
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : community_data
        }
    }catch(err){
        logger.error(
            'DB error [community]' +
            '\n \t' + err
        )
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }

}

async function viewCommunity(community_search){
    try{
        if(!community_search){
            return{
                "Message" : "community_search가 없습니다.",
                "Status" : 406
            }
        }
        const community_data = await communityDao.getCommunity(community_search)
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : community_data
        }
    }catch(err){
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }

}

module.exports = {
    postCommunity,
    deleteCommunity,
    updateCommunity,
    getCommunity,
    viewCommunity
  };