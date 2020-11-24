const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート]
const Client = require("pg");
const Users = require("../models/index.js").Users;
const LineEvent = require("./LineEventController");//Lineのイベント対応用
const PG = require("./PGController");
const awaitDelay = require("./awaitDelay");
const Linebot = require("./LinbotController");
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};
const bot = new line.Client(line_config)


async function Distribution(QuestionnaireID) {
    let tartgetlist = await PG.FindTarget(QuestionnaireID);
    if (tartgetlist != false) {
        let userslist = await PG.Finddb(
            {
                gradeID: tartgetlist
            }
        );
        if (userslist != false) {
            userslist.forEach(lineid => {
                message = await PG.GetQuestiondb(QuestionnaireID)
                Linebot.SendMessage(lineid,message)
            });
        }
    }
}

exports.Distribution = Distribution;