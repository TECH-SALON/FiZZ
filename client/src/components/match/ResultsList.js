import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../utils/Modal';

export default class ResultsList extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      result: {
        name: '',
        opponent: '',
        winPercentage: '',
        createdAt: ''
      }
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(item) {
    this.setState({
      modalIsOpen: true,
      result: {
        name: item.name,
        opponent: item.opponent,
        winPercentage: item.winPercentage,
        createdAt: item.createdAt
      }
    })
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  renderModal() {
    const { result } = this.state;
    return(
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.closeModal()}
          title="Result detail"
          description="Result"
        >
          <ul>
            <li>{result.name}</li>
            <li>{result.opponent}</li>
            <li>{result.winPercentage}</li>
            <li>{result.createdAt}</li>
          </ul>
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
              <th>Opponent</th>
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
              <td>Bot1</td>
              <td>ReversiBot</td>
              <td>30%</td>
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
