// 新しくBotをDBに保存するためのフォーム

import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class BotRegisterForm extends Component {

  // static propTypes = {
  //   onRegisterClicked: PropType.func.isRequired,
  // }

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
      gameId: this.state.gameId,
      botName: this.state.botName,
      repoUrl: this.state.repoUrl,
      isPrivate: this.state.isPrivate,
    }

    //TODO ここでbot名が一意であるかどうかを検査して、一意でなければ登録せずにエラーを表示する
    //gameIdが-1のときはcallさせない

    this.props.onRegisterClicked(bot)
  };

  render() {
    return(
      <div className="bot-register-form">
        <form onSubmit={this.props.handleRegisterClicked}>
          <p className="contents-title"><i className="material-icons">file_upload</i>Register your Bot</p>
          <label htmlFor="newBotName">Bot name:</label>
          <input name="newBotName" type="text" className="register-input" value={this.state.newBotName} onChange={this.handleChange} />
          <label htmlFor="newImageName">Docker Image:</label>
          <input name="newImageName" type="text" className="register-input" value={this.state.newImageName} onChange={this.handleChange} />
          <label htmlFor="newImageName">Game name:</label>
          <select name="newSelectedGameName" className="register-input" value={this.state.selectedGameName} onChange={this.handleChange}>
            <option value="-1">Select game name</option>
            <option value="0">OX GAME</option>
            <option value="1">Reversi</option>
          </select>
          <button type="submit" value="submit" className="register-button">Register!</button>
        </form>
      </div>
    )
  }
}
