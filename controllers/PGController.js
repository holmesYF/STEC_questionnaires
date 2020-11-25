const server = require("express")();   
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート
const e = require("express");
const Client = require("pg");
//const  = require("sequelize/types/lib/operators");
const Users = require("../models/index.js").Users;
const Grades = require("../models/index.js").Grades;
const Target = require("../models/index.js").Target;
const Questionnaires =require("../models/index.js").Questionnaires;
const Questionnaire = require("./QuestionnaireControllerYF");
const LineEvent = require("./LineEventController");//Lineのイベント対応用
const line_config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
  channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};
//友達登録済かチェックする
function Checkdb(LineID){ 
    
    return new Promise(resolve =>{
        Users.findOne({
            where: { lineID: LineID } 
        }).then(users =>{
            console.log(Object.keys(users) + "\n")
            console.log("LineID =>" + users.dataValues.lineID + " is already friend");
            resolve(false);
        }).catch(e => {
            console.log("not friend");
            resolve(true);
        })
    } )  
    // Users.findOne({
    //         where: { lineid: LineID } 
    //     }).then(user => {
    //     console.log(Object.keys(user));
    //     return 0;
    //   })
    //   .catch(e =>{
    //       console.log("no friend");
    //       return 1;
    //   })

}
function DeleteAll(){
    Users.destroy({
        where: {
          userid: 1
        }
      })
}

function AddFriend(event,_sex,_grade) {
    console.log(_sex + _grade)
    Grades.findOne({
        where:{
            grade:_grade 
        }
    }).then(gradeid =>{
        console.log(gradeid.dataValues.id)
        Users.create({
            lineID:event.source.userId,
            gradeID:gradeid.dataValues.id,
            sex:_sex,
            createdAt: new Date(),
            updatedAt: new Date()
        }).then(colect =>{
            console.log("Add new friend with grade => " + colect + "\n");
            return true;
        }).catch(e =>{
            console.error("error create Users e=>" + e)
            return false
        })
    }).catch(e =>{
        console.error("error add frind e=>" + e)
        return false
    })

}

function FindTarget(questionnaireID){
    return new Promise(resolve =>{
        targetlist = []
        Target.FindAll({
            where:{
                QuestionnaireID:questionnaireID
            }
        }).then(target =>{
            Object.keys(target).forEach(key=>{
                targetlist.push(Target[key].dataValues.gradeID)
            })
            resolve(targetlist)
        }).catch(e =>{
            console.error("Find target error =>" + e)
            resolve(false)
        })
    })
    
}

function Finddb(identity){
    return new Promise(resolve =>{
        Users.FindAll({
            where:identity
        }).then(users =>{
            lineIDlist = []
            Object.keys(users).forEach(key =>{
                lineIDlist.push(users[key].dataValues.lineID)
            })
            resolve(lineIDlist)
        }).catch(e =>{
            console.error("Finddb error=>" + e)
            resolve(false)
        })
    })
    
}

function GetQuestiondb(questionnaireID){
    return Promise(resolve =>{
        Questionnaires.findOne({
            where:{
                id:questionnaireID
            }
        }).then(qestion =>{
            Object.keys(qestion).forEach(key =>{
                resolve(qestion[key].dataValues.question);
            })
        }).catch(e =>{
            console.error("GetQuestion error =>" + e);
        })
    })
}
function CheckQuestionTimedb(){
    return Promise(resolve =>{
        Questionnaires.findAll({
            where: {
                startAt: {
                    [Sequelize.Op.lt]: "2018-12-10 11:40:00",
                },
                startAt: {
                    [Sequelize.Op.gt]: "2030-12-10 11:20:00",
                }
            }
        }).then(question =>{
            let questionidlist = []
            Object.keys(question).forEach(key =>{
                questionidlist.push(question[key].dataValues.id)
            })
            resolve(questionidlist)
        }).catch(e =>{
            console.error("CheckQuestionTimedb error =>" + e)
            resolve(null)
        })
    })
}

exports.CheckQuestionTimedb = CheckQuestionTimedb;
exports.GetQuestiondb =GetQuestiondb;
exports.FindTarget = FindTarget;
exports.Finddb = Finddb;
exports.Checkdb = Checkdb;
exports.DeleteAll = DeleteAll;
exports.AddFriend = AddFriend;