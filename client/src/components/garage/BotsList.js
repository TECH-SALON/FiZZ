import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import BotDetailModal from './BotDetailModal';
import CodeCheckModal from './CodeCheckModal';

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
      botDetailModal: false,
      codeCheckModal: false,
      botModaled: {
        botCode: "",
        name: "",
        isQualified: "",
        isValid: "",
        rank: "",
        isPrivate: "",
        runtime: "",
        resourceUrl: "",
        gameName: "",
        createdAt: "",
        updatedAt: ""
      },
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(modalName, item) {
    this.setState({
      [modalName]: true,
      botModaled: {
        botCode: item.get("botCode"),
        name: item.get("name"),
        isStandBy: item.get("isValid"),
        isQualified: item.get("isQualified"),
        isValid: item.get("isValid"),
        rank: item.get("rank"),
        runtime: item.get("runtime"),
        resourceUrl: item.get("resourceUrl"),
        isPrivate: item.get("isPrivate"),
        gameName: item.get("gameName"),
        createdAt: item.get("createdAt"),
        updatedAt: item.get("updatedAt")
      }
    })
  }

  closeModal(modalName) {
    this.setState({[modalName]: false});
  }

  formatStatus(bot) {
    if(bot.get('isQualified')) {
      return 'is Qualified'
    } else if(bot.get('isValid')) {
      return 'is Valid'
    } else {
      return 'is not valid'
    }
  }

  renderCodeCheckModal() {
    return(
      <CodeCheckModal
        bot={this.state.botModaled}
        isOpen={this.state.codeCheckModal}
        onRequestClose={() => this.closeModal("codeCheckModal")}
        onRequestCodeCheck={this.props.onRequestCodeCheck}
      />
    )
  }

  renderBotDetailModal() {
    return(
      <BotDetailModal
        bot={this.state.botModaled}
        isOpen={this.state.botDetailModal}
        onRequestClose={() => this.closeModal("botDetailModal")}
      />
    )
  }

  render() {
    console.log(this.props);
    const { bots, botsLoading } = this.props;
    return(
      <div className="table">
        {this.renderBotDetailModal()}
        {this.renderCodeCheckModal()}
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
              let status = this.formatStatus(i);
              return(
                <tr key={i.get("botCode")}>
                  <td>{i.get("name")}</td>
                  <td>{status}</td>
                  <td>{i.get("gameName")}</td>
                  <td>
                    <button className="button detail-button margin-top-5" onClick={(e) => this.openModal("botDetailModal", i)}>Detail</button> <button className="practice-button margin-top-5" onClick={(e) => this.openModal("codeCheckModal", i)}>CodeCheck</button>
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
