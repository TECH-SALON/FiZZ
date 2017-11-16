import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../utils/Modal';

export default class BotsList extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      item: {
        name: '',
        status: '',
        resultSummary: '',
        createdAt: ''
      }
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(item) {
    this.setState({
      modalIsOpen: true,
      item: {
        name: item.name,
        status: item.status,
        resultSummary: item.resultSummary,
        createdAt: item.createdAt
      }
    })
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  renderModal() {
    const { item } = this.state;
    return(
      <div>
        <Modal
          isOpen={this.state.detailModal}
          onRequestClose={() => this.closeModal("detailModal")}
          title="Bot's detail"
          description="Botの情報。名前やURLを修正できます。"
        >
          <ul>
            <li>{item.name}</li>
            <li>{item.status}</li>
            <li>{item.resultSummary}</li>
            <li>{item.createdAt}</li>
          </ul>
          <button className="button-primary">Edit</button>
        </Modal>
      </div>
    )
  }
  render() {
    return(
      <div className="table">
        {this.renderModal()}
        <table className="u-full-width">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Win%</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bot1</td>
              <td>ReversiBot</td>
              <td>30%</td>
              <td>
                <button className="button detail-button margin-top-5" onClick={() => this.openModal()}>Detail</button>
              </td>
            </tr>
            <tr>
              <td>Bot2</td>
              <td>ReversiBot2</td>
              <td>40%</td>
              <td>
                <button className="button detail-button margin-top-5" onClick={() => this.openModal()}>Detail</button>
              </td>
            </tr>
            <tr>
              <td>Bot3</td>
              <td>ReversiBot3</td>
              <td>60%</td>
              <td>
                <button className="button detail-button margin-top-5" onClick={() => this.openModal()}>Detail</button>
              </td>
            </tr>
            <tr>
              <td>Bot1</td>
              <td>ReversiBot</td>
              <td>30%</td>
              <td>
                <button className="button detail-button margin-top-5" onClick={() => this.openModal()}>Detail</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
