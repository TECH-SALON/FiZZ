// 新しくBotをDBに保存するためのフォーム

import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class BotRegisterForm extends Component {

  static propTypes = {
    username: PropType.string.isRequired,
    onRegisterClicked: PropType.func.isRequired,
  }

  constructor(props) {
    super(props);
    // 登録フォームのstate管理
    this.state = {
      gameName: '',
      botName: '',
      url: '',
      repoType: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.registerBot = this.registerBot.bind(this);
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleRegisterClicked(event) {
    event.preventDefault();
    let bot = {
      gameName: this.state.gameName,
      botName: this.state.botName,
      url: this.state.url,
      repoType: this.state.repoType,
    }

    //TODO ここでbot名が一意であるかどうかを検査して、一意でなければ登録せずにエラーを表示する

    let username = this.props.userName;
    BotActions.registerBotToDB(botName, imageName, gameName, userName);
    this.props.onRegisterClicked(username, bot)
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
