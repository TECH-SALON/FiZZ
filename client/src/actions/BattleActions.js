// Bot間対戦に関わるアクション群
// addSelectedBot: 対戦者募集板に自分のBotを登録する
// runBattle: 自分のBotを対戦者募集板にある他のBotと対戦させる
// storeChallengerResult: 自分のBot情報に対戦履歴を追加する
// storeOpponentResult: 相手のBot情報に対戦履歴を追加する

import Dispatcher from '../dispatcher';
import React from 'react';
import AWS from 'aws-sdk';
import $ from 'jquery';

import BotActions from './BotActions';

const BattleActions = {

  addSelectedBot(botName, userName, gameName) {
    let db = new AWS.DynamoDB.DocumentClient();
    let time = new Date();
    let createdAt = time.getTime();
    let params = {
      TableName: "fizzBots",
      Key: {
        "userId": AWS.config.credentials.identityId,
        "botName": botName
      },
      UpdateExpression: "set #bs = :value",
      ExpressionAttributeNames: {
        "#bs": "botState",
      },
      ExpressionAttributeValues: {
        ":value": "onBoard",
      },
      ReturnValues: "UPDATED_NEW"
    };
    db.update(params, function(err, data) {
      if (err) {
        console.error("Unable to add your bot. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        BotActions.fetch();
      }
    })
  },

  runBattle(challengerInfo, opponentInfo) {
    let data = {
      ChallengerImageName: challengerInfo.imageName,
      OpponentImageName: opponentInfo.imageName
    };
    console.log("通信中...");
    $.ajax({
      type:"POST",
      url:"http://localhost:8484/api/beta",
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
    }).done(function(result) {
      console.log("対戦完了");
      let challengerResult = result.challenger;
      let opponentResult = result.opponent;
      // challenger側、opponent側両方のbotに対戦結果を保存する
      // TODO: storeChallengerResultとstoreOpponentResultの処理内容が似ているので一つの関数にまとめる
      BattleActions.storeChallengerResult(challengerInfo, opponentInfo, challengerResult).then(
        () => BattleActions.storeOpponentResult(opponentInfo, challengerInfo, opponentResult).then(
          () => BotActions.fetchBotsFromDB()
        )
      );
      ;
    }).fail(function() {
      console.log("Server error");
    }).always(function() {
      console.log("通信は終了しました");
    })
  },

  storeChallengerResult(challengerInfo, opponentInfo, challengerResult) {
    return new Promise((resolve) => {
      let winStatus, loseStatus, drawStatus;
      if (challengerResult.win > challengerResult.lose) {
        winStatus = 1;
        loseStatus = 0;
        drawStatus = 0;
      } else if (challengerResult.win < challengerResult.lose) {
        winStatus = 0;
        loseStatus = 1;
        drawStatus = 0;
      } else {
        winStatus = 0;
        loseStatus = 0;
        drawStatus = 1;
      };
      let db = new AWS.DynamoDB.DocumentClient();
      let time = new Date();
      let createdAt = time.getTime();
      let params = {
        TableName: "fizzBots",
        Key: {
          "userId": challengerInfo.userId,
          "botName": challengerInfo.botName
        },
        UpdateExpression:
          "set #ua = :ua, \
           #r.#w = #r.#w + :ws, \
           #r.#l = #r.#l + :ls, \
           #r.#d = #r.#d + :ds, \
           #rds = list_append(if_not_exists(#rds, :empty), :result)",
          //  :emptyがあるのは、list_appendが、既存カラムが存在しない時に想定通りに機能しないから
        ExpressionAttributeNames: {
          "#ua": "updatedAt",
          "#r": "result",
          "#w": "win",
          "#l": "lose",
          "#d": "draw",
          "#rds": "resultDetails",
        },
        ExpressionAttributeValues: {
          ":ua": createdAt,
          ":ws": winStatus,
          ":ls": loseStatus,
          ":ds": drawStatus,
          ":result": [
            {
              "myBotName": challengerInfo.botName,
              "myImageName": challengerInfo.imageName,
              "opponentName": opponentInfo.userName,
              "opponentBotName": opponentInfo.botName,
              "createdAt": createdAt,
              "result": {
                "win": challengerResult.win,
                "lose": challengerResult.lose,
                "draw": challengerResult.draw
              }
            }
          ],
          ":empty": []
        },
        ReturnValues: "UPDATED_NEW"
      };
      db.update(params, function(err, data) {
        if (err) {
            console.error("Unable to store challengerResult. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
          resolve();
        }
      });
    });
  },
  storeOpponentResult(opponentInfo, challengerInfo, opponentResult) {
    return new Promise((resolve) => {
      let winStatus, loseStatus, drawStatus;
      if (opponentResult.win > opponentResult.lose) {
        winStatus = 1;
        loseStatus = 0;
        drawStatus = 0;
      } else if (opponentResult.win < opponentResult.lose) {
        winStatus = 0;
        loseStatus = 1;
        drawStatus = 0;
      } else {
        winStatus = 0;
        loseStatus = 0;
        drawStatus = 1;
      };
      let db = new AWS.DynamoDB.DocumentClient();
      let time = new Date();
      let createdAt = time.getTime();
      let params = {
        TableName: "fizzBots",
        Key: {
          "userId": opponentInfo.userId,
          "botName": opponentInfo.botName
        },
        UpdateExpression:
          "set #ua = :ua, \
           #r.#w = #r.#w + :ws, \
           #r.#l = #r.#l + :ls, \
           #r.#d = #r.#d + :ds, \
           #rds = list_append(if_not_exists(#rds, :empty), :result)",
           //  :emptyがあるのは、list_appendが、既存カラムが存在しない時に想定通りに機能しないから
        ExpressionAttributeNames: {
          "#ua": "updatedAt",
          "#r": "result",
          "#w": "win",
          "#l": "lose",
          "#d": "draw",
          "#rds": "resultDetails",
        },
        ExpressionAttributeValues: {
          ":ua": createdAt,
          ":ws": winStatus,
          ":ls": loseStatus,
          ":ds": drawStatus,
          ":result": [
            {
              "myBotName": opponentInfo.botName,
              "myImageName": opponentInfo.imageName,
              "opponentName": challengerInfo.userName,
              "opponentBotName": challengerInfo.botName,
              "createdAt": createdAt,
              "result": {
                "win": opponentResult.win,
                "lose": opponentResult.lose,
                "draw": opponentResult.draw
              }
            }
          ],
          ":empty": []
        },
        ReturnValues: "UPDATED_NEW"
      };
      db.update(params, function(err, data) {
        if (err) {
            console.error("Unable to store opponentResult. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
          resolve();
        }
      });
    });
  },
}

export default BattleActions;
