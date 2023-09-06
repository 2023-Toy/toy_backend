var express = require("express");
const router = express.Router();
const BabyController = require("../controller/baby.controller");

router.get("/baby", BabyController.getBaby);
router.post("/baby", BabyController.postBaby);
router.put("/baby", BabyController.putBaby);
router.delete("/baby", BabyController.deleteBaby);

module.exports = router;