import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalContainer from '../utils/Modal';

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
        <ModalContainer
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
        </ModalContainer>
        <ModalContainer
          isOpen={this.state.practiceModal}
          onRequestClose={() => this.closeModal("practiceModal")}
          title="Practice your bot"
          description="このbotを練習試合させますか？ボタンを押すと練習が始まります。結果は結果一覧リストに表示されます。"
        >
          <button onClick={(item) => this.props.onPracticeBot(item.botId)} className="button-primary">YES</button>
        </ModalContainer>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bots.map((item) => {
              return(
                <tr key={item.get("id")}>
                  <td>{item.get("name")}</td>
                  <td>{item.get("isQualified")}</td>
                  <td>{item.get("gameId")}</td>
                  <td>
                    <button className="button detail-button margin-top-5" onClick={(item) => this.openModal("detailModal", item)}>Detail</button> <button className="practice-button margin-top-5" onClick={() => this.renderPracticeModal(item)}>Practice</button>
                  </td>
                </tr>
              )
            })}
            {/* <tr>
              <td>Bot1</td>
              <td>NotQualified</td>
              <td>Reversi</td>
              <td>30%</td>
              <td>
                <button className="button detail-button margin-top-5" onClick={(item) => this.openModal("detailModal", item)}>Detail</button> <button className="practice-button margin-top-5" onClick={(item) => this.openModal("practiceModal", item)}>Practice</button>
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
            </tr> */}
          </tbody>
        </table>
      </div>
    )
  }
}
