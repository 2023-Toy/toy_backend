var express = require('express');
var router = express.Router();
// import loginController from '../controller/login.controller.js'
const loginController = require('../controller/login.controller')

router.get('/login', loginController.getLogin);
router.post('/login', loginController.postLogin);
// router.delete('/withdraw', loginController.deleteLogin);

module.exports = router;