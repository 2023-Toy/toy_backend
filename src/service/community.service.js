const communityDao = require('../DAO/community.dao')
const logger = require('../config/logger')

async function getMain(){
    try{
        const community_data = await communityDao.getMain()
        console.log("community_data : " , community_data)
        for (const element of community_data) {
            const tags = await communityDao.findTag(element.community_id);
            element.tag_name = tags.map(tag => tag.tag_name);
        }
        // await Promise.all(community_data.map(async (element) => {
        //     const tags = await communityDao.findTag(element.community_id);
        //     element.tag_name = tags.map(tag => tag.tag_name);
        // }))
        console.log(community_data);
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : community_data
        }
    }
    catch(err){
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }
}

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


module.exports = {
    getMain,
    postCommunity,
    deleteCommunity,
    updateCommunity
  };