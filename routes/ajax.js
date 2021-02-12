var express = require('express');
var router = express.Router();
const QuestionnairesController = require("../controllers/QuestionnairesController");
const ResultController = require("../controllers/ResultController");
const UsersController = require("../controllers/UsersController");

/* GET users listing. */

router.get("/Questionnaires", QuestionnairesController.get);
router.get("/Users", UsersController.get);

router.delete("/Questionnaire", QuestionnairesController.delete);

router.get("/result", ResultController.get);

module.exports = router;
