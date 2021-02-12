const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート]
const Client = require("pg");
const Users = require("../models/index.js").User;
const LineEvent = require("./LineEventController");//Lineのイベント対応用
const PG = require("./PGController");
const Linebot = require("./LinbotController");
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};
const bot = new line.Client(line_config)


async function Distribution(QuestionnaireID) {
    let tartgetlist = await PG.FindTarget(QuestionnaireID);
    if (tartgetlist != false) {
        console.log("targetlist =>" + tartgetlist)
        let userslist = await PG.Finddb(
            {
                gradeID: tartgetlist
            }
        );
        if (userslist != false) {
            // message = await PG.GetQuestiondb(QuestionnaireID)
            
            userslist.forEach(lineid => {
                var message = "https//hogehoge/" + QuestionnaireID + "?id=" +  lineid
                Linebot.SendMessage(lineid,
                    {
                        type:"text",
                        text:message
                    })
            });
        }
    }
    else{
        console.log("targetlist is false")
    }
}
function test(){
    Distribution(3);
}

async function TimeCheckdb(){
   QuestionnaireIDlist = await PG.CheckQuestionTimedb()
   if (QuestionnaireIDlist != null){
       QuestionnaireIDlist.forEach(QuestionnaireID =>{
           Distribution(QuestionnaireID)
       })
   }
}

exports.TimeCheckdb = TimeCheckdb;
exports.test = test;
exports.Distribution = Distribution;