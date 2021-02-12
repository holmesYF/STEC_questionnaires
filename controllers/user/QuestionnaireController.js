const Questionnaire = require("../../models").Questionnaire;

module.exports = {
    get: (req, res, next) => {
        const id = req.params.id;
        Questionnaire.findByPk(id)
        .then((questionnaire) => {
            //res.send(questionnaire);
            res.render("questionnaire", {
                questionnaire,
                title: "アンケートの回答フォーム"
            });
        })
    }
}