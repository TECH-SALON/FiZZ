import React, { Component } from 'react';
import Modal from 'react-modal';

export default class ModalContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.onRequestClose}
          className="modal"
          overlayClassName="modal-overlay"
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }
}
