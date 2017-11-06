// 自分の登録したBotの一覧を表示するテーブル

import React, { Component } from 'react';


export default class MyBotsTable extends Component {
  render() {
    return(
      <div className="my-bots-table">
        <p className="contents-title">MyBotsTable</p>
        <div className="bots-table">
          <table className="u-full-width">
            <thead>
              <tr>
                <th>Name</th>
                <th>ImageName</th>
                <th>Game</th>
                <th>Result</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.bots.map(item => {
                let result = item.result.win + "勝" + item.result.lose + "敗" + item.result.draw + "引"
                return(
                  <tr key={item.botName}>
                    <td>{item.botName}</td>
                    <td>{item.imageName}</td>
                    <td>{item.gameName}</td>
                    <td>{result}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
