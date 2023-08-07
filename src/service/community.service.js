const communityDao = require('../DAO/community.dao')
const logger = require('../config/logger')
const commonDao = require('../DAO/common.dao')

async function getMain(){
    try{
        const community_data = await communityDao.getMain()
        console.log("community_data : " , community_data)
        for (const element of community_data) {
            const tags = await commonDao.findTag(element.community_id);
            element.tag_name = tags.map(tag => tag.tag_name);
        }
        // await Promise.all(community_data.map(async (element) => {
        //     const tags = await communityDao.findTag(element.community_id);
        //     element.tag_name = tags.map(tag => tag.tag_name);
        // }))
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

async function getCommunity(){
    try{
        const community_data = await communityDao.getCommunity()
        for (const element of community_data) {
            const tags = await commonDao.findTag(element.community_id)
            element.tag_name = tags.map(tag => tag.tag_name)
        }
        for(const element of community_data){
            const imgs = await communityDao.getCommunityImg(element.community_id)
            element.community_path = imgs.map(img => img.community_path)
        }
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : community_data
        }
    }
    catch (err){
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }
}

async function getCommunityBoard(id){
    try{
        if(!id){
            return{
                "Message" : "id가 없습니다.",
                "Status" : 400
            }
        }
        const community_data = await communityDao.getCommunityBoard(id)
        for (const element of community_data) {
            const tags = await commonDao.findTag(id)
            element.tag_name = tags.map(tag => tag.tag_name)
        }
        for(const element of community_data){
            const imgs = await communityDao.getCommunityImg(id)
            element.community_path = imgs.map(img => img.community_path)
        }
        return{
            "Message" : "성공",
            "Status" : 200,
            "Data" : community_data
        }
    }
    catch (err){
        return{
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
    getCommunity,
    getCommunityBoard,
    postCommunity,
    deleteCommunity,
    updateCommunity
  };