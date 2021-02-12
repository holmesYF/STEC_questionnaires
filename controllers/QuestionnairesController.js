const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json);
const Questionnaire = require("../models").Questionnaire;
const Target = require("../models").Target;
const Grade = require("../models").Grade;

module.exports = {
    post: function(req, res, next){
        const now = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' });
        const body = req.body;
        const title = body.title;
        const question = body.question;
        const startDate = body.startDate.replace(/-/g, " ");
        const startTime = body.startTime;
        var start = startDate + " " +startTime + ":00:00";
        const endDate = body.endDate.replace(/-/g, " ");
        const endTime = body.endTime;
        var end = endDate + " " + endTime + ":00:00";
        var start = new Date(start).toLocaleString({ timeZone: 'Asia/Tokyo' });
        var end = new Date(end).toLocaleString({ timeZone: 'Asia/Tokyo' });
        var target = body.target;

        Questionnaire.create({
            title: title,
            question: question,
            startDate: start,
            endDate: end,
            createdAt: now,
            updatedAt: now
        })
        .then((questionnaire)=>{
            var questionnaireID = questionnaire.dataValues.id;
            Grade.findAll({
                where:{
                    grade:target
                },
                attributes:["id"]
            })
            .then((idList)=>{
                var targetList = idList.map(value=>{
                    var id = value.dataValues.id;
                    return {questionnaireID, gradeID:id, createdAt:now, updatedAt:now}
                })
                Target.bulkCreate(targetList)
            })
        })
        .then(user =>{
            res.redirect("/");
        })
    },

    get: function(req, res, next){
        Questionnaire.findAll({
            attributes:{
                exclude: ["createdAt", "updatedAt"]
            },
            include:[
                {
                    model: Grade,
                    attributes: ["grade"]
                },
            ],

        }).then((users)=>{
            res.send(users);
        })
    },

    delete: function(req, res, next){
        const id = req.query.id;
        
        Questionnaire.destroy({
            where:{
                id
            }
        })
        .then(()=>{
            res.end();
        })
        .catch(e=>{
            console.log(e)
        })
    }
}