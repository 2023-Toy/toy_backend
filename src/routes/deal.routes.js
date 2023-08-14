var express = require('express')
const router = express.Router()
const uploads = require('../module/multer')
const authUtil = require('../middlewares/auth')
const DealController = require('../controller/deal.controller')

router.get('/search', authUtil.checkToken, DealController.getListDeal);
router.get('/', authUtil.checkToken, DealController.getDeal);
router.post('/', authUtil.checkToken, uploads.deal_upload.array('deal_img'), DealController.postDeal);
router.delete('/', authUtil.checkToken, DealController.deleteDeal);
router.put('/edit', DealController.putDeal);
router.put('/state', DealController.putStateDeal);

module.exports = router;