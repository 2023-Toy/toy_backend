var express = require('express');
const router = express.Router();
const uploads = require('../module/multer')
const DealController = require('../controller/deal.controller')

router.post('/deal', DealController.postDeal);
//router.put('/deal/edit', DealController.putDeal);
//router.delete('/deal', DealController.deleteDeal);
//router.get('/deal/search', DealController.getDealList);
//router.get('/deal', DealController.getDeal);

router.post('/deal', uploads.upload.array('deal_img'), (req, res) => {
    console.log(req.files);
    res.send('upload!!!');
})

module.exports = router;