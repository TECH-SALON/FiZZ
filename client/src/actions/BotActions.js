// Bot情報に関するアクション群
// RegisterBotToDB: 新しいBotをDBに新規追加する
// practice: 選択したBotをランダムに手をうつBotと対戦させる
// fetchBotsFromDB: DBからBot情報を取得し、自分のbotとゲームごとに分類する（それぞれBot情報と対戦履歴に分類）

import Dispatcher from '../dispatcher';
import React from 'react';
import AWS from 'aws-sdk';
import $ from 'jquery';

const BotActions = {

  RegisterBotToDB(botName, imageName, gameName, userName) {
    let db = new AWS.DynamoDB.DocumentClient();
    let time = new Date();
    let createdAt = time.getTime();
    let item = {
      TableName: 'fizzBots',
      Item: {
        userId: AWS.config.credentials.identityId,
        botName: botName,
        imageName: imageName,
        gameName: gameName,
        userName: userName,
        createdAt: createdAt,
        botState: "notQualified",
        result: {
          "win": 0,
          "lose": 0,
          "draw": 0
        }
      }
    };
    db.put(item, function(err, data) {
      if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        BotActions.fetch();
      }
    });
  },
  // 登録したBotを練習試合させる
  practice(botName, imageName, gameName) {
    let data = {
      imageName: imageName
    };
    let postUrl;
    switch (gameName) {
      case "oxGame":
        postUrl = "http://localhost:8484/api/beta";
        break;
      default:
        postUrl = "";
    };
    console.log("通信中...");
    $.ajax({
      type:"POST",
      url: postUrl,
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
    }).done(function(result) {
      console.log("対戦完了");
      console.log(result);
      BotActions.storePracticeResult(botName, imageName, gameName, result);
    }).fail(function() {
      console.log("Server error");
    }).always(function() {
      console.log("通信は終了しました");
    })
  },
  // 自分の登録したBotの一覧をDBから取得する
  fetchBotsFromDB() {
    return new Promise((resolve) => {
      let db = new AWS.DynamoDB.DocumentClient();
      let params = {
        TableName: 'fizzBots',
      };
      db.scan(params, function(err, data) {
        if(err) {
          console.log(JSON.stringify(err, undefined, 2));
        } else {
          // DBから取得したデータを分類する
          let myBots = data.Items.filter((item) => {
            if (item.userId == AWS.config.credentials.identityId) {
              return true;
            }
          });
          let myReversiBots = myBots.filter((item) => {
            if (item.gameName == "reversi") {
              return true;
            }
          });
          let myOxBots = myBots.filter((item) => {
            if (item.gameName == "oxGame") {
              return true;
            }
          });
          let oxBots = data.Items.filter((item) => {
            if (item.gameName == "oxGame" && item.botState == "onBoard") {
              return true;
            }
          });
          let reversiBots = data.Items.filter((item) => {
            if (item.gameName == "reversi" && item.botState == "onBoard") {
              return true;
            }
          });
          // 自分のBotの対戦履歴およびゲームごとの対戦履歴を抽出する
          let myBattleResults = [];
          let myPracticeResults = [];
          let myOxResults = [];
          let myReversiResults = [];
          // 自分のBots全体の対戦履歴
          myBots.map((item) => {
            // 登録Bot毎の対戦結果詳細情報を一つの配列にまとめる
            Array.prototype.push.apply(myBattleResults, item.resultDetails);
          });
          // 対戦結果詳細情報を時系列に並べなおす
          myBattleResults.sort((a, b) => {
            return (a.createdAt > b.createdAt ? -1 : 1);
          });
          // 自分のBotsの練習対戦履歴
          myBots.map((item) => {
            Array.prototype.push.apply(myPracticeResults, item.practiceResultDetails);
          });
          myPracticeResults.sort((a, b) => {
            return (a.createdAt > b.createdAt ? -1 : 1);
          });
          // Oxゲームの対戦履歴
          myOxBots.map((item) => {
            Array.prototype.push.apply(myOxResults, item.resultDetails);
          });
          myOxResults.sort((a, b) => {
            return (a.createdAt > b.createdAt ? -1 : 1);
          });
          // リバーシの対戦履歴
          myReversiBots.map((item) => {
            Array.prototype.push.apply(myReversiResults, item.resultDetails);
          });
          myReversiResults.sort((a, b) => {
            return (a.createdAt > b.createdAt ? -1 : 1);
          });

          Dispatcher.dispatch({
            type: 'fetchBots',
            myBots,
            myOxBots,
            myReversiBots,
            oxBots,
            reversiBots,
            myBattleResults,
            myPracticeResults,
            myOxResults,
            myReversiResults
          });
          resolve();
        }
      })
    })
  },
  storePracticeResult(botName, imageName, gameName, result) {
    let db = new AWS.DynamoDB.DocumentClient();
    let time = new Date();
    let createdAt = time.getTime();
    let botState;
    if (result.win / 100 > 0.95) {
      botState = "qualified"
    } else {
      botState = "notQualified"
    };
    let params = {
      TableName: "fizzBots",
      Key: {
        "userId": AWS.config.credentials.identityId,
        "botName": botName
      },
      UpdateExpression:
        "set #prd = list_append(if_not_exists(#prd, :empty), :result), \
         #bs = :bs",
      ExpressionAttributeNames: {
        "#bs": "botState",
        "#prd": "practiceResultDetails",
      },
      ExpressionAttributeValues: {
        ":bs": botState,
        ":result": [
          {
            "botName": botName,
            "imageName": imageName,
            "gameName": gameName,
            "createdAt": createdAt,
            "result": {
              "win": result.win,
              "lose": result.lose,
              "draw": result.draw
            }
          }
        ],
        ":empty": []
      },
      ReturnValues: "UPDATED_NEW"
    };
    db.update(params, function(err, data) {
      if (err) {
          console.error("Unable to store result. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        BotActions.fetch();
      }
    });
  }
}

export default BotActions;
