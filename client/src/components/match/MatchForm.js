import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from '../utils/Modal';

export default class MatchForm extends Component {

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
      botId: "",
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
    let id = this.state.botId;
    this.props.onMatchRun(id);
    this.setState({
      botName: "",
      gameId: 0,
      url: "",
      comment: "",
    });
  }

  render() {
    const { bots } = this.props;
    return(
      <div>
        <button className="button-primary" onClick={this.openModal}>Select Bot</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.closeModal("addNewModal")}
          title="Select your bot"
          description="対戦をさせるBotを選択しましょう"
        >
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="botsOption">Select your bot</label>
            <select name="botId" value={this.state.botId} onChange={this.handleChange} className="u-full-width" id="botsOption">
              {bots.map((item) => {
                <option value={item.id}>{item.name}</option>
              })}
            </select>
            <input className="button-primary" type="submit" value="Submit"/>
          </form>
        </Modal>
      </div>
    )
  }
}
