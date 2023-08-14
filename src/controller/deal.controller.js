const DealService = require('../service/deal.service')
const logger = require('../config/logger')
const jwt = require('../module/jwt')

//get_list_deal_controller
async function getListDeal(req, res, next) {
    const getListDeal_req = req.query
    const getListDeal_data = await DealService.getListDeal(getListDeal_req)
    return res.status(getListDeal_data.Status).json(getListDeal_data)
}
//get_deal_controller
async function getDeal(req, res, next) {
    const getDeal_req = req.query.deal_id
    const getDeal_data = await DealService.getDeal(getDeal_req)
    return res.status(getDeal_data.Status).json(getDeal_data)
}

//post_deal_controller
async function postDeal(req, res, next) {
    const jwt_token = req.headers.jwt_token
    const token = await jwt.verify(jwt_token)
    const postDeal_req = req.body
    const postDeal_img_req = req.files
    const postDeal_data = await DealService.postDeal(token.IDX, postDeal_req, postDeal_img_req)
    return res.status(postDeal_data.Status).json(postDeal_data)
}

//delete_deal_controller -> 돌려보자
async function deleteDeal(req, res, next) {
    const jwt_token = req.headers.jwt_token
    const token = await jwt.verify(jwt_token)
    const deleteDeal_req = req.body
    const deleteDeal_data = await DealService.deleteDeal(token.IDX, deleteDeal_req)
    return res.status(deleteDeal_data.Status).json(deleteDeal_data)
}

//put_deal_controller -> 돌려보자
async function putDeal(req, res, next) {
    const putDeal_deal_id = req.body.deal_id
    const putDeal_req = req.body
    const putDeal_img_req = req.files
    const putDeal_data = await DealService.putDeal(putDeal_deal_id, putDeal_req, putDeal_img_req)
    return res.status(putDeal_data.Status).json(putDeal_data)
}
//put_state_deal_controller
async function putStateDeal(req, res, next) {
    const putStateDeal_deal_state = req.body.deal_state
    const putStateDeal_deal_id = req.body.deal_id
    const putStateDeal_data = await DealService.putStateDeal(putStateDeal_deal_id, putStateDeal_deal_state)
    return res.status(putStateDeal_data.Status).json(putStateDeal_data)
}

module.exports = {
    getListDeal, getDeal, postDeal, deleteDeal, putDeal, putStateDeal
}