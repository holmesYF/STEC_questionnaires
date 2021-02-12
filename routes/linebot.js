var express = require('express');
var router = express.Router();
var linebot = require("../controllers/LinbotController");

/* GET home page. */
router.post('/webhook/', linebot.linebot);
router.get('/post/',linebot.linepost);
router.get('/update',linebot.time);

module.exports = router;
