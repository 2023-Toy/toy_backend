var express = require('express');
var router = express.Router();
// import dealController from '../controller/deal.controller.js'
const DealController = require('../controller/deal.controller')

router.post('/deal', DealController.postDeal);
//router.put('/deal/edit', DealController.putDeal);
//router.delete('/deal', DealController.deleteDeal);
//router.get('/deal/search', DealController.getDealList);
//router.get('/deal', DealController.getDeal);

module.exports = router;