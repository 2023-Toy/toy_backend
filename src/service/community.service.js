const communityDao = require('../DAO/community.dao')
const logger = require('../config/logger')
const commonDao = require('../DAO/common.dao')
const fs = require("fs");

async function getMain() {
    try {
        const community_data = await communityDao.getMain()
        for (const element of community_data) {
            const tags = await commonDao.findTag(element.community_id);
            element.tag_name = tags.map(tag => tag.tag_name);
        }
        // await Promise.all(community_data.map(async (element) => {
        //     const tags = await communityDao.findTag(element.community_id);
        //     element.tag_name = tags.map(tag => tag.tag_name);
        // }))
        return {
            "Message": "성공",
            "Status": 200,
            "Data": community_data
        }
    } catch (err) {
        return {
            "Message": "실패",
            "Status": 400,
            "Error_Message": err
        }
    }
}

async function getCommunity() {
    try {
        const community_data = await communityDao.getCommunity()
        for (const element of community_data) {
            const tags = await commonDao.findTag(element.community_id)
            element.tag_name = tags.map(tag => tag.tag_name)
        }
        return {
            "Message": "성공",
            "Status": 200,
            "Data": community_data
        }
    } catch (err) {
        return {
            "Message": "실패",
            "Status": 400,
            "Error_Message": err
        }
    }
}

async function getCommunityBoard(id) {
    try {
        if (!id) {
            return {
                "Message": "id가 없습니다.",
                "Status": 400
            }
        }
        const community_data = await communityDao.getCommunityBoard(id)
        for (const element of community_data) {
            const tags = await commonDao.findTag(id)
            element.tag_name = tags.map(tag => tag.tag_name)
        }
        for (const element of community_data) {
            const imgs = await communityDao.getCommunityImg(id)
            element.community_path = imgs.map(img => img.community_path)
        }
        const comment_data = await communityDao.getCommunityComment(id)
        return {
            "Message": "성공",
            "Status": 200,
            "Data": community_data
        }
    } catch (err) {
        return {
            "Message": "실패",
            "Status": 400,
            "Error_Message": err
        }
    }
}

async function getSearch(search) {
    try {
        if (search === '%undefined%') {
            return {
                "Message": "search값이 없습니다.",
                "Status": 406
            }
        }
        const community_data = await communityDao.getSearch(search)
        if (!Object.keys(community_data).length) {
            return {
                "Message": "성공",
                "Status": 200,
                "Data": "검색 결과가 없습니다."
            }
        }
        return {
            "Message": "성공",
            "Status": 200,
            "Data": community_data
        }
    } catch (err) {
        return {
            "Message": "실패",
            "Status": 400,
            "Error_Message": err
        }
    }
}

async function postCommunity(user_id, token, title, content, community_img, community_tag) {
    try {
        if (!user_id || !title || !content) {
            return {
                "Message": "user_id 혹은 제목, 내용이 없습니다.",
                "Status": 406
            }
        }
        const name = commonDao.findName(user_id)
        const community_id = await communityDao.postCommunity(user_id, token, title, content) //커뮤니티 테이블에 글 등록
        if (community_img) {
            for (const e of community_img) {
                await communityDao.postCommunityImg(community_id, e)
            }
        }
        for (const e of community_tag) {
            await communityDao.postCommunityTag(community_id, e)
        }
        logger.info(
            '[Community 등록 시도] => ' + '[' + token + ']' + name + ' 성공'
        )
        return {
            "Message": "성공",
            "Status": 200,
        }
    } catch (err) {
        return {
            "Message": "실패",
            "Status": 400,
            "Error_Message": err
        }
    }

}

async function putCommunity(id, token, community_id, title, content, community_img, community_tag){
    try{
        if(!community_id){
            return {
                "Message" : "실패",
                "Status" : 406,
                "Error" : "community_id가 없습니다."
            }
        }
        const name = await commonDao.findName(id)
        const preUserid = await commonDao.findCommunityUser(community_id)
        if(!preUserid === id){
            logger.error(
                '[게시글 수정 ERROR] =>' + "[" + token + "] " + id,
                '\n \t' + name +'은 community_id : ' + community_id +'의 작성자가 아님'
            )
            return {
                "Message" : "실패",
                "Status" : 406,
                "Error" : name+"은 해당 게시글의 작성자가 아닙니다."
            }
        }
        const community_img_data = await communityDao.getCommunityImg(community_id)
        console.log(community_img_data)
        community_img_data.forEach(path => {
            fs.unlink(path, (err) => {
                if(err){
                    logger.error(
                        '[커뮤니티 파일 삭제] => ' + path + ' 실패',
                        '\n \t' + err
                    )
                }
                else{
                    logger.info(
                        '[커뮤니티 파일 삭제] => ' + path + ' 성공'
                    )
                }
            })
        })
        await communityDao.updateCommunity(community_id, title, content, token, name)
        for (const e of community_img) {
            await communityDao.postCommunityTag(community_id, e)
        }
        for (const e of community_tag) {
            await communityDao.postCommunityTag(community_id, e)
        }
        return {
            "Message" : "성공",
            "Status" : 200
        }
    }catch (err){
        return {
            "Message": "실패",
            "Status": 400,
            "Error_Message": err
        }
    }
}

async function deleteCommunity(community_id) {
    try {
        if (!community_id) {
            return {
                "Message": "community_id가 없습니다.",
                "Status": 406
            }
        }
        const community_data = await communityDao.deleteCommunity(community_id)
        return {
            "Message": "성공",
            "Status": 200,
            "Data": community_data
        }
    } catch (err) {
        return {
            "Message": "실패",
            "Status": 400,
            "Error_Message": err
        }
    }

}


module.exports = {
    getMain,
    getCommunity,
    getCommunityBoard,
    getSearch,
    postCommunity,
    putCommunity,
    deleteCommunity,
}