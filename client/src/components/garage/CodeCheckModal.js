import React, { Component } from 'react';
import Modal from 'react-modal';

export default class CodeCheckModal extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const bot = this.props.bot;
    bot.username = this.props.username;
    this.props.onRequestCodeCheck(bot);
  }

  render() {
    const { bot } = this.props;
    return(
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        title="Bot's detail"
        description="Botの情報。名前やURLを修正できます。"
        className="modal"
        closeTimeoutMS={350}
        overlayClassName="modal-overlay">
        <div className="modal-header">
          <h3>CODE CHECK</h3>
          <p>Let's check your code status</p>
        </div>
        <div className="modal-content">
          <button onClick={this.handleClick} className="button-primary">START</button>
        </div>
      </Modal>
    )
  }
}
