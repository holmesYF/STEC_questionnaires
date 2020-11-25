var express = require('express');
var router = express.Router();
var linebot = require("../controllers/LinbotController");

/* GET home page. */
router.post('/', linebot.linebot);
router.get('/post/',linebot.linepost);

module.exports = router;
