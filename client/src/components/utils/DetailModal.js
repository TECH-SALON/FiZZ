import React, { Component } from 'react';
import Modal from 'react-modal';

export default class DetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "SUBMIT"
    }
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
          <div className="modal-header">
            <h3>{this.props.title}</h3>
            <p>{this.props.description}</p>
          </div>
          <div className="modal-content">
            {this.props.children}
          </div>
          {this.props.isEditing ?
            <div className="modal-footer">
              <button onClick={this.props.onSubmit} className="modal-edit-button">Save</button>
              <button onClick={this.props.onCanselEdit} className="modal-edit-button">Cansel</button>
            </div>
            : ""
          }
        </Modal>
      </div>
    );
  }
}
