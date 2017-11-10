// 自分のBotの対戦履歴を表示するテーブル

import React, { Component } from 'react';

export default class BattleResults extends Component {

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
      <div className="my-battle-results">
        <div className="bots-table">
          <table className="u-full-width">
            <thead>
              <tr>
                <th>AI Name</th>
                <th>Win</th>
                <th>Lose</th>
                <th>Draw</th>
                <th>Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* {this.props.results.map(item => {
                let date = this.getFormatedDate(item.createdAt);
                return(
                  <tr key={item.createdAt}>
                    <td>{item.botName}</td>
                    <td>{item.result.win}</td>
                    <td>{item.result.lose}</td>
                    <td>{item.result.draw}</td>
                    <td>{date}</td>
                  </tr>
                )})} */}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
