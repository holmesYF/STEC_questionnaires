const server = require("express")();
const line = require("@line/bot-sdk");
const Client = require("pg");
//const { SET_DEFERRED } = require("sequelize/types/lib/deferrable");
const Users = require('../models/index.js').Users;
const Linebot = require("./LinbotController");
const Questionnaire = require("./QuestionnaireController");

//#region 友達登録時に送るFlexメッセージ
const add_friend_message_male = {
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "学年を登録してください。\n登録後アンケートやお得なクーポンが届くようになります。",
        "wrap": true
      }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "spacing": "sm",
    "contents": [
      {
        "type": "button",
        "style": "link",
        "height": "sm",
        "action": {
          "type": "postback",
          "label": "大学1年生",
          "data": "add B1 m",
          "displayText": "大学1年生"
        }
      },
      {
        "type": "button",
        "style": "link",
        "height": "sm",
        "action": {
          "type": "postback",
          "label": "大学2年生",
          "data": "add B2 m",
          "displayText": "大学2年生"
        }
      },
      {
        "type": "button",
        "action": {
          "type": "postback",
          "label": "大学3年生",
          "data": "add B3 m",
          "displayText": "大学3年生"
        }
      },
      {
        "type": "button",
        "action": {
          "type": "postback",
          "label": "大学4年生",
          "data": "add B4 m",
          "displayText": "大学4年生"
        }
      },
      {
        "type": "button",
        "action": {
          "type": "postback",
          "label": "大学院1年生",
          "data": "add M1 m",
          "displayText": "大学院1年生"
        }
      },
      {
        "type": "button",
        "action": {
          "type": "postback",
          "label": "大学院2年生",
          "data": "add M2 m",
          "displayText": "大学院2年生"
        }
      },
      {
        "type": "spacer",
        "size": "sm"
      }
    ],
    "flex": 0
  }
}
const add_friend_message_female = {
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "学年を登録してください。\n登録後アンケートやお得なクーポンが届くようになります。",
        "wrap": true
      }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "spacing": "sm",
    "contents": [
      {
        "type": "button",
        "style": "link",
        "height": "sm",
        "action": {
          "type": "postback",
          "label": "大学1年生",
          "data": "add B1 f",
          "displayText": "大学1年生"
        }
      },
      {
        "type": "button",
        "style": "link",
        "height": "sm",
        "action": {
          "type": "postback",
          "label": "大学2年生",
          "data": "add B2 f",
          "displayText": "大学2年生"
        }
      },
      {
        "type": "button",
        "action": {
          "type": "postback",
          "label": "大学3年生",
          "data": "add B3 f",
          "displayText": "大学3年生"
        }
      },
      {
        "type": "button",
        "action": {
          "type": "postback",
          "label": "大学4年生",
          "data": "add B4 f",
          "displayText": "大学4年生"
        }
      },
      {
        "type": "button",
        "action": {
          "type": "postback",
          "label": "大学院1年生",
          "data": "add M1 f",
          "displayText": "大学院1年生"
        }
      },
      {
        "type": "button",
        "action": {
          "type": "postback",
          "label": "大学院2年生",
          "data": "add M2 f",
          "displayText": "大学院2年生"
        }
      },
      {
        "type": "spacer",
        "size": "sm"
      }
    ],
    "flex": 0
  }
}
const add_friend_message_sex = {
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "学年を登録してください。\n登録後アンケートやお得なクーポンが届くようになります。",
        "wrap": true
      }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "spacing": "sm",
    "contents": [
      {
        "type": "button",
        "style": "link",
        "height": "sm",
        "action": {
          "type": "postback",
          "label": "男",
          "data": "sex m",
          "displayText": "男"
        }
      },
      {
        "type": "button",
        "style": "link",
        "height": "sm",
        "action": {
          "type": "postback",
          "label": "女",
          "data": "sex f",
          "displayText": "女"
        }
      },
      {
        "type": "spacer",
        "size": "sm"
      }
    ],
    "flex": 0
  }
}
//#endregion
const line_config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
  channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};
const bot = new line.Client(line_config);

function MessageEvent(event, events_processed) {
  if (event.message.text == "こんにちは") {
    // replyMessage()で返信し、そのプロミスをevents_processedに追加。
    events_processed.push(bot.replyMessage(event.replyToken,
      {
        type: "text",
        text: event.source.userId


      }
    ));
  }
  else if (event.message.text == "test") {

    Users.findAll({
      where: {
        id: [2, 0, 6, 10]
      }
    }).then(users => {
      //console.log(Object.keys(users));
      console.log("users =>" + users)
      Object.keys(users).forEach(key => {
        Linebot.SendMessage(users[key].dataValues.lineID,
          {
            type: 'text',
            text: "これは君のIDを特定して送信されているよ"
          }
        )
        // console.log(users[key].dataValues)
      })
    })
  }
  else if (event.message.text == "全消去") {
    Users.destroy({
      where: {
        userid: 1
      }
    }).then(() => {
      console.log("delete data");
    });
  }
  else {
    // replyMessage()で返信し、そのプロミスをevents_processedに追加。
    events_processed.push(bot.replyMessage(event.replyToken,
      {
        type: "text",
        text: event.message.text
      }
    ));
    bot.pushMessage()
  }
}



function SendRegistratSex(event) {
  Linebot.SendMessage(event.source.userId, [
    {
      "type": "flex",
      "altText": "友達登録ありがとうございます!!",
      "contents": add_friend_message_sex
    }
  ]
  )
  console.log("Send messeage check sex flex message ver male")
}
function SendRegistratGradeMale(event) {
  Linebot.SendMessage(event.source.userId, [
    {
      "type": "flex",
      "altText": "学年を登録してください",
      "contents": add_friend_message_male
    }
  ]
  )
  console.log("Send messeage check grade flex message ver male")
}
function SendRegistratGradeFemale(event) {
  Linebot.SendMessage(event.source.userId, [
    {
      "type": "flex",
      "altText": "学年を登録してください",
      "contents": add_friend_message_female
    }
  ]
  )
  console.log("Send messeage check grade flex message ver male")
}

exports.SendRegistratGradeMale = SendRegistratGradeMale;
exports.SendRegistratGradeFemale = SendRegistratGradeFemale;
exports.SendRegistratSex = SendRegistratSex;
exports.MessageEvent = MessageEvent;
