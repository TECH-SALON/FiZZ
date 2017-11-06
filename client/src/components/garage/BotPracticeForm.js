// 登録したBotを練習試合させるためのフォーム

import React, { Component } from 'react';
import BotActions from '../../actions/BotActions';

export default class BotPracticeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBot: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.practiceSelectedBot = this.practiceSelectedBot.bind(this);
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  practiceSelectedBot(event) {
    event.preventDefault();
    let selectedBot = this.state.selectedBot;
    let array = selectedBot.split(",");
    let botName = array[0];
    let imageName = array[1];
    let gameName = array[2];
    BotActions.practice(botName, imageName, gameName);
  };

  render() {
    return(
      <div className="bot-practice-form">
        <p className="contents-title">Practice Your Bot</p>
        <form onSubmit={this.practiceSelectedBot}>
          <label htmlFor="newBotName">Selected Bot:</label>
          <select name="selectedBotForPractice" className="bot-selecter" value={this.state.selectedBot} onChange={this.handleChange}>
            <option value="">Please select</option>
            {this.props.bots.map(item => {
              let botInfo = item.botName+","+item.imageName+","+item.gameName;
              return(
                <option value={botInfo} key={item.botName}>{item.botName} - ({item.imageName}) - {item.gameName}</option>
              )
            })}
          </select>
          <button type="submit" value="submit" className="register-button">Practice!</button>
        </form>
      </div>
    )
  }
}
