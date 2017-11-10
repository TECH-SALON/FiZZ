// 練習試合の結果を表示するテーブル
import React, { Component } from 'react';

export default class PracticeResults extends Component {
  // DBから取得した時間データはUNIXタイムスタンプ形式であるため、日本時間にフォーマット化する
  // （参照） http://yut.hatenablog.com/entry/20111015/1318633937
  getFormatedDate(timestamp) {
    let d = new Date(timestamp);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    var hour = ( d.getHours() < 10 ) ? '0' + d.getHours()   : d.getHours();
    var min  = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
    var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
  };

  render() {
    return(
      <div className="practice-results">
        <p className="contents-title">Your Bots not qualified</p>
        <div className="bots-table">
          <table className="u-full-width">
            <thead>
              <tr>
                <th>Name</th>
                <th>ImageName</th>
                <th>Game</th>
                <th>CreatedAt</th>
                <th>Result</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* {this.props.results.map(item => {
                let winPercentage = Math.floor(item.result.win / (item.result.win + item.result.lose + item.result.draw)*10000)/100;
                let date = this.getFormatedDate(item.createdAt);
                return(
                  <tr key={item.createdAt}>
                    <td>{item.botName}</td>
                    <td>{item.imageName}</td>
                    <td>{item.gameName}</td>
                    <td>{date}</td>
                    <td>{winPercentage + "%"}</td>
                  </tr>
                )
              })} */}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
