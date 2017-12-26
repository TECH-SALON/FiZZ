import React, { Component } from 'react';
import Modal from 'react-modal';

export default class CreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "SUBMIT"
    }
  }

  render() {
    const { loading } = this.props;
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.onRequestClose}
          className="modal"
          closeTimeoutMS={350}
          overlayClassName="modal-overlay"
        >
          <div className="modal-header">
            <h3>{this.props.title}</h3>
            <p>{this.props.description}</p>
          </div>
          <div className="modal-content">
            {this.props.children}
          </div>
        </Modal>
      </div>
    );
  }
}
