var express = require('express');
var router = express.Router();
var questionnaireController = require("../controllers/QuestionnairesController");

/* GET home page. */
router.post("/", questionnaireController.submit);

module.exports = router;