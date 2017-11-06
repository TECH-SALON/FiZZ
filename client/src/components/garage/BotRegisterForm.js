// 新しくBotをDBに保存するためのフォーム

import React, { Component } from 'react';
import BotActions from '../../actions/BotActions';


export default class BotRegisterForm extends Component {

  constructor(props) {
    super(props);
    // 登録フォームのstate管理
    this.state = {
      newBotName: '',
      newImageName: '',
      newSelectedGameName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.registerBot = this.registerBot.bind(this);
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  registerBot(event) {
    event.preventDefault();
    let botName = this.state.newBotName;
    let imageName = this.state.newImageName;
    let gameName = this.state.newSelectedGameName;
    let userName = this.props.userName;
    BotActions.registerBotToDB(botName, imageName, gameName, userName);
  };

  render() {
    return(
      <div className="bot-register-form">
        <form onSubmit={this.props.onSubmit}>
          <p className="contents-title"><i className="material-icons">file_upload</i>Register your Bot</p>
          <label htmlFor="newBotName">Bot name:</label>
          <input name="newBotName" type="text" className="register-input" value={this.state.newBotName} onChange={this.handleChange} />
          <label htmlFor="newImageName">Docker Image:</label>
          <input name="newImageName" type="text" className="register-input" value={this.state.newImageName} onChange={this.handleChange} />
          <label htmlFor="newImageName">Game name:</label>
          <select name="newSelectedGameName" className="register-input" value={this.state.selectedGameName} onChange={this.handleChange}>
            <option value="">Select game name</option>
            <option value="oxGame">OX GAME</option>
            <option value="reversi">Reversi</option>
          </select>
          <button type="submit" value="submit" className="register-button">Register!</button>
        </form>
      </div>
    )
  }
}
