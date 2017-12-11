import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalContainer from '../utils/Modal';
import Spinner from 'react-spinkit';

import {
  Map as IMap, List as IList
} from 'immutable';


export default class BotsList extends Component {
  static propTypes = {
    bots: PropTypes.object.isRequired,
  }
  constructor() {
    super();
    this.state = {
      detailModal: false,
      practiceModal: false,
      itemModaled: {
        name: "",
        isQualified: "",
        isValid: "",
        rank: "",
        isPrivate: "",
        gameName: "",
        createdAt: "",
        updatedAt: ""
      }
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(modalName, item) {
    this.setState({
      [modalName]: true,
      itemModaled: {
        name: item.get("name"),
        isQualified: item.get("isQualified"),
        isValid: item.get("isValid"),
        rank: item.get("rank"),
        isPrivate: item.get("isPrivate"),
        gameName: item.get("gameId"),
        createdAt: item.get("createdAt"),
        updatedAt: item.get("updatedAt")
      }
    })
  }

  closeModal(modalName) {
    this.setState({[modalName]: false});
  }

  renderModals() {
    const { itemModaled } = this.state;
    return(
      <div>
        <ModalContainer
          isOpen={this.state.detailModal}
          onRequestClose={() => this.closeModal("detailModal")}
          title="Bot's detail"
          description="Botの情報。名前やURLを修正できます。"
        >
          <table className="u-full-width">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{itemModaled.name}</td>
              </tr>
              <tr>
                <th>GameName</th>
                <td>{itemModaled.gameName}</td>
              </tr>
              <tr>
                <th>Rank</th>
                <td>{itemModaled.rank}</td>
              </tr>
              <tr>
                <th>isPrivate</th>
                <td>{itemModaled.isPrivate}</td>
              </tr>
              <tr>
                <th>createdAt</th>
                <td>{itemModaled.createdAt}</td>
              </tr>
              <tr>
                <th>updatedAt</th>
                <td>{itemModaled.updatedAt}</td>
              </tr>
            </tbody>
          </table>
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
    const { bots, botsLoading } = this.props;
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
            {botsLoading ? <tr><td>Data is loading now....</td></tr> : null}
            {bots.map((i) => {
              return(
                <tr key={i.get("id")}>
                  <td>{i.get("name")}</td>
                  <td>{i.get("isQualified")}</td>
                  <td>{i.get("gameId")}</td>
                  <td>
                    <button className="button detail-button margin-top-5" onClick={(e) => this.openModal("detailModal", i)}>Detail</button> <button className="practice-button margin-top-5" onClick={() => this.renderPracticeModal(item)}>Practice</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
