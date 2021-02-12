var express = require('express');
var router = express.Router();
var userController = require("../controllers/UsersController");
var QuestionnaireContoroller = require("../controllers/user/QuestionnaireController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'STEC-sample-app' });
});

router.get("/questionnaire/:id", QuestionnaireContoroller.get);

module.exports = router;
