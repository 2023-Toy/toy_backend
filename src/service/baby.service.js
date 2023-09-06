const babyDao = require('../DAO/baby.dao')

//get_baby_service
async function getBaby(idx, baby_id) {
    try {
        if(!idx || !baby_id) {
            return {
                "Message" : "요청 값이 없습니다.",
                "Status" : 406
            }
        }
        const getBaby_data = await babyDao.getBaby(idx, baby_id);
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : getBaby_data
        }
    } catch(err) {
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }
}

//post_baby_service
async function postBaby(idx, req) {
    try {
        if(!idx || !req) {
            return {
                "Message" : "요청 값이 없습니다.",
                "Status" : 406
            }
        }
        const postBaby_data = await babyDao.postBaby(idx, req);
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : postBaby_data
        }
    } catch(err) {
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }
}

//delete_baby_service
async function deleteBaby(idx, baby_id) {
    try {
        if(!idx || !baby_id) {
            return {
                "Message" : "요청 값이 없습니다.",
                "Status" : 406
            }
        }
        const deleteBaby_data = await babyDao.deleteBaby(idx, baby_id);
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : deleteBaby_data
        }
    } catch(err) {
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }
}

//put_baby_service
async function putBaby(idx, req, baby_id) {
    try {
        if(!idx || !req || !baby_id) {
            return {
                "Message" : "요청 값이 없습니다.",
                "Status" : 406
            }
        }
        const putBaby_data = await babyDao.putBaby(idx, req, baby_id);
        return {
            "Message" : "성공",
            "Status" : 200,
            "Data" : putBaby_data
        }
    } catch(err) {
        return {
            "Message" : "실패",
            "Status" : 400,
            "Error_Message" : err
        }
    }
}

module.exports = {
    getBaby, postBaby, deleteBaby, putBaby
}