var express = require('express');
const router = express.Router();
const uploads = require('../module/multer')
const DealController = require('../controller/deal.controller')

//router.put('/deal/edit', DealController.putDeal);
//router.delete('/deal', DealController.deleteDeal);
//router.get('/deal/search', DealController.getDealList);
//router.get('/deal', DealController.getDeal);

router.post('/', uploads.deal_upload.array('deal_img'), DealController.postDeal);
router.put('/edit', DealController.putDeal);  //수정 필요
router.get('/search', DealController.getListDeal);
//router.get('/', DealController.getDeal);

module.exports = router;