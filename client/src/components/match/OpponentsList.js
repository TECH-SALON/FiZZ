import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../utils/Modal';

export default class OpponentsList extends Component {
  static propTypes = {
    bots: PropTypes.object.isRequired,
  }
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      opponent: {
        name: '',
        author: '',
        winPercentage: '',
      }
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(modalName, item) {
    this.setState({
      [modalName]: true,
      opponent: {
        name: opponent.name,
        author: opponent.author,
        winPercentage: opponent.winPercentage
      }
    })
  }

  closeModal(modalName) {
    this.setState({[modalName]: false});
  }

  renderModal() {
    const { opponent } = this.state;
    return(
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.closeModal("detailModal")}
          title="Opponent's detail"
          description="相手のBotの情報"
        >
          <ul>
            <li>{opponent.name}</li>
            <li>{opponent.author}</li>
            <li>{opponent.winPercentage}</li>
          </ul>
          <button className="button-primary">Run</button>
        </Modal>
      </div>
    )
  }

  render() {
    const { bots } = this.props;
    return(
      <div className="table">
        {this.renderModal()}
        <table className="u-full-width">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Win%</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bots.map((opponent) => {
              <tr>
                <td>{opponent.name}</td>
                <td>{opponent.author}</td>
                <td>{opponent.winPercentage}</td>
                <td>{item.winPercentage}</td>
                <td>
                  <button className="button detail-button margin-top-5" onClick={(item) => this.openModal("detailModal", item)}>Detail</button> <button className="practice-button margin-top-5" onClick={() => this.renderPracticeModal(item)}>Practice</button>
                </td>
              </tr>
            })}
            <tr>
              <td>Bot1</td>
              <td>toshi443</td>
              <td>30%</td>
              <td>
                <button className="practice-button margin-top-5" onClick={() => this.openModal()}>Match!</button>
              </td>
            </tr>
            <tr>
              <td>Bot1</td>
              <td>toshi443</td>
              <td>30%</td>
              <td>
                <button className="practice-button margin-top-5" onClick={() => this.openModal()} >Match!</button>
              </td>
            </tr>
            <tr>
              <td>Bot1</td>
              <td>toshi443</td>
              <td>30%</td>
              <td>
                <button className="practice-button margin-top-5" onClick={() => this.openModal()}>Match!</button>
              </td>
            </tr>
            <tr>
              <td>Bot1</td>
              <td>toshi443</td>
              <td>30%</td>
              <td>
                <button className="practice-button margin-top-5" onClick={() => this.openModal()}>Match!</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
