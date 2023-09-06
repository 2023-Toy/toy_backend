const BabyService = require("../service/baby.service");
const jwt = require("../module/jwt");

//get_baby_controller
async function getBaby(req, res, next) {
    const jwt_token = req.headers.jwt_token;
    const token = await jwt.verify(jwt_token);
    const baby_id = req.query.baby_id;
    const getBaby_data = await BabyService.getBaby(token.IDX, baby_id);
    return res.status(getBaby_data.Status).json(getBaby_data);
}

//post_baby_controller
async function postBaby(req, res, next) {
    const jwt_token = req.headers.jwt_token;
    const token = await jwt.verify(jwt_token);
    const postBaby_req = req.body;
    const postBaby_data = await BabyService.postBaby(token.IDX, postBaby_req);
    return res.status(postBaby_data.Status).json(postBaby_data);
}

//delete_baby_controller
async function deleteBaby(req, res, next) {
    const jwt_token = req.headers.jwt_token;
    const token = await jwt.verify(jwt_token);
    const baby_id = req.body.baby_id;
    const deleteBaby_data = await BabyService.deleteBaby(token.IDX, baby_id);
    return res.status(deleteBaby_data.Status).json(deleteBaby_data);
}

//put_baby_controller
async function putBaby(req, res, next) {
    const jwt_token = req.headers.jwt_token;
    const token = await jwt.verify(jwt_token);
    const putBaby_req = req.body;
    const baby_id = req.body.baby_id;
    const putBaby_data = await BabyService.putBaby(token.IDX, putBaby_req, baby_id);
    return res.status(putBaby_data.Status).json(putBaby_data);
}

module.exports = {
    getBaby, postBaby, putBaby, deleteBaby
};