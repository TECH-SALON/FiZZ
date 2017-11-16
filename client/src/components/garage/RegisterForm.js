import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from '../utils/Modal';

export default class RegisterForm extends Component {

  // static propTypes = {
  //   bots: PropTypes.object.isRequired,
  //   onStandBot: PropTypes.func.isRequired,
  //   onRegisterBot: PropTypes.func.isRequired,
  //   onSetup: PropTypes.func.isRequired
  // }

  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      botName: "",
      gameId: 0,
      url: "",
      comment: ""
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let bot = {
      name: this.state.botName,
      gameId: this.state.gameId,
      url: this.state.url,
      comment: this.state.comment
    };
    this.props.onRegisterBot(bot);
    this.setState({
      botName: "",
      gameId: 0,
      url: "",
      comment: "",
    });
  }

  render() {
    return(
      <div>
        <button className="button-primary" onClick={this.openModal}>Add New</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          title="Add your Bot"
          description="Botを登録しましょう"
        >
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="botName">Bot name:</label>
            <input name="botName" value={this.state.botName} onChange={this.handleChange} className="u-full-width" type="text" placeholder="bot name" id="botName"/>
            <label htmlFor="repositoryUrl">Repository URL:</label>
            <input name="url" value={this.state.url} onChange={this.handleChange} className="u-full-width" type="text" placeholder="repository url" id="repositoryUrl"/>
            <label htmlFor="gameId">Game name:</label>
            <select name="gameId" value={this.state.gameId} onChange={this.handleChange} className="u-full-width">
              <option>Please select</option>
              <option value="1">Reversi</option>
            </select>
            <label htmlFor="botComment">Comment:</label>
            <textarea name="comment" value={this.state.comment} onChange={this.handleChange} className="u-full-width" placeholder="このBotの説明" id="botComment"></textarea>
            <input className="button-primary" type="submit" value="Submit"/>
          </form>
        </Modal>
      </div>
    )
  }
}
