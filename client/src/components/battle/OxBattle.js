import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dialog, { DialogTitle, DialogContent, DialogContentText } from 'material-ui/Dialog';
import BattleActions from '../../actions/BattleActions';

export default class OxBattle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      registerBot: '',
      challengerInfo: '',
      opponentInfo: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addSelectedBot = this.addSelectedBot.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.runBattle = this.runBattle.bind(this);
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleDialogOpen(event, item) {
    this.setState({
      opponentInfo: item,
      open: true
    })
  };

  handleDialogClose() {
    this.setState({
      open: false
    })
  };

  addSelectedBot(event) {
    event.preventDefault();
    let registerBot = this.state.registerBot;
    let array = registerBot.split(",");
    let botName = array[0];
    let imageName = array[1];
    BattleActions.addSelectedBot(botName, "oxGame");
  };

  runBattle(event) {
    event.preventDefault();
    let array = this.state.challengerInfo.split(",");
    let userId = array[0];
    let botName = array[1];
    let imageName = array[2];
    let challengerInfo = {
      userId: userId,
      botName: botName,
      imageName: imageName
    };
    let opponentInfo = this.state.opponentInfo;
    BattleActions.runBattle(challengerInfo, opponentInfo);
  };

  getFormatedDate(timestamp) {
    let d = new Date(timestamp);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    var hour = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
    var min  = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
    var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
  };

  render() {
    // let rank = 0;
    // let reversiRanking = this.props.reversiBots.concat();
    // reversiRanking.sort((a, b) => {
    //   return (a.result.win > b.result.win ? -1 : 1);
    // });
    return(
      <div className="reversi-battle">
        <div className="row">
          <div className="eight columns">
            <div className="contents-box">
              <div className="bots-list">
                <h2>Bots List <i className="material-icons info-icon">info_outline</i></h2>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Bot名</th>
                        <th>戦績</th>
                        <th>作成者</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.oxBots.map(item => {
                        let result = item.result.win + "勝" + item.result.lose + "敗" + item.result.draw + "引";
                        return (
                          <tr key={item.botName}>
                            <td>{item.botName}</td>
                            <td>{result}</td>
                            <td>{item.userName}</td>
                            <td><a name={item.botName} className="button table-button" onClick={(event) => this.handleDialogOpen(event, item)}>対戦</a></td>
                          </tr>
                        )
                      })}
                    </tbody>
                    <Dialog open={this.state.open} onRequestClose={this.handleDialogClose}>
                      <div className="dialog-content">
                        <h3 className="dialog-title">Select your bot</h3>
                        <form onSubmit={this.runBattle}>
                          <select name="challengerInfo" className="bot-selecter" value={this.state.challengerInfo} onChange={this.handleChange}>
                            <option value="">Please select</option>
                            {this.props.myOxBots.map(item => {
                              let challengerInfo = item.userId+","+item.botName+","+item.imageName;
                              return(
                                <option value={challengerInfo} key={item.botName}>{item.botName} ({item.imageName})</option>
                              )
                            })}
                          </select>
                          <button type="submit" value="submit" className="register-button">Battle with this bot</button>
                        </form>
                      </div>
                    </Dialog>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="four columns">
            <div className="contents-box">
              <h2>Register <i className="material-icons info-icon">info_outline</i></h2>
              <div className="register-form-area">
                <form onSubmit={this.addSelectedBot}>
                  <p className="form-title"><i className="material-icons select-icon">mouse</i>Select your Bot</p>
                  <select name="registerBot" className="bot-selecter" value={this.state.registerBot} onChange={this.handleChange}>
                    <option value="">Please select</option>
                    {this.props.myOxBots.map(item => {
                      let botInfo = item.botName+","+item.imageName;
                      return(
                        <option value={botInfo} key={item.botName}>{item.botName} ({item.imageName})</option>
                      )
                    })}
                  </select>
                  <button type="submit" value="submit" className="register-button">Add this bot</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="contents-box">
          <div className="my-result">
            <h2>My Result <i className="material-icons info-icon">info_outline</i></h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>対戦時間</th>
                    <th>対戦相手のbot名</th>
                    <th>自分のbot名</th>
                    <th>勝敗</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.myOxResults.map(item => {
                    let result = item.result.win + "勝" + item.result.lose + "敗" + item.result.draw + "引";
                    let formatedDate = this.getFormatedDate(item.createdAt);
                    return (
                      <tr key={item.createdAt}>
                        <td>{formatedDate}</td>
                        <td>{item.opponentBotName}</td>
                        <td>{item.myBotName}</td>
                        <td>{result}</td>
                        <td><a className="button table-button">対戦ログ</a></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="contents-box">
          <div className="reversi-ranking">
            <h2>Ox Ranking <i className="material-icons info-icon">info_outline</i></h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>順位</th>
                    <th>Bot名</th>
                    <th>作者</th>
                    <th>戦績</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* {reversiRanking.map(item => {
                    rank++;
                    let result = item.result.win + "勝" + item.result.lose + "敗" + item.result.draw + "引";
                    return (
                      <tr key={rank}>
                        <td>{"No"+rank}</td>
                        <td>{item.botName}</td>
                        <td>{item.userName}</td>
                        <td>{result}</td>
                        <td><a className="button table-button">対戦を申し込む</a></td>
                      </tr>
                    )
                  })} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="contents-box">
          <div className="reversi-chat">
            <h2>Chat <i className="material-icons info-icon">info_outline</i></h2>
            <p>Coming soon...</p>
          </div>
        </div>
      </div>
    )
  }
}
