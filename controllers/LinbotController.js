const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート]
const Client = require("pg");
const Users = require("../models/index.js").Users;
const LineEvent = require("./LineEventController");//Lineのイベント対応用
const PG = require("./PGController");
const awaitDelay = require("./awaitDelay");
const Questionnaire = require("./QuestionnaireControllerYF");
const line_config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
  channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};
const bot = new line.Client(line_config)

async function RegistratFriend(event, sex, grade) {
  let flag = await PG.Checkdb(event.source.userId);
  if (flag) {
    //#region  いらない部分
    //PG.AddFriend(event,events_processed,res);
    //  Users.create({
    //   lineID:event.source.userId,
    //   gradeID:1,
    //   sex:1,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }).then(users => {

    //   //
    // });
    //  console.log("add friend\n");
    //#endregion
    PG.AddFriend(event, sex, grade)
  }
  else {
    console.log("already Registration\n");
    SendMessage(event.source.userId, {
      type: 'text',
      text: 'もうすでに登録されたアカウントです。\n登録の変更には******と送ってね。'
    })
  }
}


// module.exports = {
//webhookの始まり
function linebot(req, res, next) {
  res.sendStatus(200);
  // すべてのイベント処理のプロミスを格納する配列。
  let events_processed = [];

  // イベントオブジェクトを順次処理。
  req.body.events.forEach((event) => {


    //テキストメッセージが送られてきたとき
    if (event.type == "message" && event.message.type == "text") {
      LineEvent.MessageEvent(event, events_processed);
    }

    //友達登録されたとき

    else if (event.type == "follow") {
      LineEvent.SendRegistratSex(event)
    }
    //ポストバック（ボタン押したとき）が返ってきたとき
    else if (event.type == "postback") {
      const postbackdata = String(event.postback.data)
      //性別選択ポストバック
      if (postbackdata.substr(0, 3) == "sex") {
        if (postbackdata.substr(4, 1) == "m") {
          LineEvent.SendRegistratGradeMale(event)
        }
        else if (postbackdata.substr(4, 1) == "f") {
          LineEvent.SendRegistratGradeFemale(event)
        }
        else {
          console.error("sex postback data =>" + postbackdata + " is not defind")
        }
      }
      //学年選択ポストバック
      else if (postbackdata.substr(0, 3) == "add") {

        if (postbackdata.substr(7, 1) == "m") {
          RegistratFriend(event, 1, postbackdata.substr(4, 2))
        }
        else if (postbackdata.substr(7, 1) == "f") {
          RegistratFriend(event, 2, postbackdata.substr(4, 2))
        }
        else {
          console.error("add postback data => " + postbackdata + " is not defind")
        }
      }
      else {
        console.error("Nothing grade");
      }

      Object.keys(event.postback.data).forEach((key) => {
        console.log("key =>" + key + " value =>" + event.postback.data[key])
      }
      );
    }

  })
  return 0;
};


function SendMessage(ID, message) {
  const client = new line.Client({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN
  });
  client.pushMessage(ID, message)
    .then(() => {
      console.log("Sucsses SendMessage");
      //res.send("Sucsses");
    })
    .catch((err) => {
      console.error("SendMessage Error" + err + " ID=> " + ID + " messag=> " + message);
      //res.send("error\n");
    });
  return 0;
};


async function linepost(req, res, next) {
  console.log(await PG.CheckQuestionTimedb())
  //const ID = "U005578f86340c26e627830d3eda9221c";

  // const message = {
  //   type: 'text',
  //   text: 'Hello World!'
  // };
  // console.log("this ver " + typeof this.SendMessage + "\n");
  // console.log("not this " + typeof SendMessage + "\n");
  // SendMessage(ID, message);
  // console.log(this)
  // res.send("test");
  // return 0;

};



exports.linebot = linebot;
exports.SendMessage = SendMessage;
exports.linepost = linepost;

// }