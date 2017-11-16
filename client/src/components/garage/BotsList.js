import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../utils/Modal';

export default class BotsList extends Component {
  static propTypes = {
    bots: PropTypes.object.isRequired,
  }
  constructor() {
    super();
    this.state = {
      detailModal: false,
      practiceModal: false,
      item: {
        name: '',
        status: '',
        gameName: '',
        resultSummary: '',
        createdAt: ''
      }
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(modalName, item) {
    this.setState({
      [modalName]: true,
      item: {
        name: item.name,
        status: item.status,
        gameName: item.gameName,
        resultSummary: item.resultSummary,
        createdAt: item.createdAt
      }
    })
  }

  closeModal(modalName) {
    this.setState({[modalName]: false});
  }

  renderModals() {
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
            <li>{item.gameName}</li>
            <li>{item.resultSummary}</li>
            <li>{item.createdAt}</li>
          </ul>
          <button className="button-primary">Edit</button>
        </Modal>
        <Modal
          isOpen={this.state.practiceModal}
          onRequestClose={() => this.closeModal("practiceModal")}
          title="Practice your bot"
          description="Botを練習させましょう"
        >
          <button className="button-primary">Run</button>
        </Modal>
      </div>
    )
  }

  render() {
    const { bots } = this.props;
    return(
      <div className="table">
        {this.renderModals()}
        <table className="u-full-width">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Game</th>
              <th>%</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bots.map((item) => {
              <tr>
                <td>{item.name}</td>
                <td>{item.status}</td>
                <td>{item.gameName}</td>
                <td>{item.winPercentage}</td>
                <td>
                  <button className="button detail-button margin-top-5" onClick={(item) => this.openModal("detailModal", item)}>Detail</button> <button className="practice-button margin-top-5" onClick={() => this.renderPracticeModal(item)}>Practice</button>
                </td>
              </tr>
            })}
            <tr>
              <td>Bot1</td>
              <td>NotQualified</td>
              <td>Reversi</td>
              <td>30%</td>
              <td>
                <button className="button detail-button margin-top-5" onClick={(item) => this.openModal("detailModal", item)}>Detail</button> <button className="practice-button margin-top-5" onClick={() => this.renderPracticeModal(item)}>Practice</button>
              </td>
            </tr>
            <tr>
              <td>Bot2</td>
              <td>NotQualified</td>
              <td>Reversi</td>
              <td>30%</td>
              <td>
                <button className="button detail-button margin-top-5" onClick={() => this.openModal("detailModal")}>Detail</button> <button className="practice-button margin-top-5" onClick={() => this.openModal("practiceModal")}>Practice</button>
              </td>
            </tr>
            <tr>
              <td>Bot3</td>
              <td>NotQualified</td>
              <td>Reversi</td>
              <td>30%</td>
              <td>
                <button className="button detail-button margin-top-5" onClick={() => this.openModal("detailModal")}>Detail</button> <button className="practice-button margin-top-5" onClick={() => this.openModal("practiceModal")}>Practice</button>
              </td>
            </tr>
            <tr>
              <td>Bot4</td>
              <td>NotQualified</td>
              <td>Reversi</td>
              <td>30%</td>
              <td>
                <button className="button detail-button margin-top-5" onClick={() => this.openModal("detailModal")}>Detail</button> <button className="practice-button margin-top-5" onClick={() => this.openModal("practiceModal")}>Practice</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
