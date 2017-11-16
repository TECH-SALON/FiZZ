import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from '../utils/Modal';

export default class AddForm extends Component {

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
          onRequestClose={() => this.closeModal("addNewModal")}
          title="Add your bot"
          description="ここに登録されたBotは他のユーザーが対戦を申し込むことができます。"
        >
          <form>
            <label htmlFor="botsOption">Select your bot</label>
            <select className="u-full-width" id="botsOption">
              <option value="Option 1">bot1</option>
              <option value="Option 2">bot2</option>
              <option value="Option 3">bot3</option>
            </select>
            <input className="button-primary" type="submit" value="Submit"/>
          </form>
        </Modal>
      </div>
    )
  }
}
