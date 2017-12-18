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
      botModal: false,
      practiceModal: false,
      editModal: false,
      itemModaled: {
        name: "",
        isQualified: "",
        isValid: "",
        rank: "",
        isPrivate: "",
        gameName: "",
        createdAt: "",
        updatedAt: ""
      },
      itemEdited: {
        name: "",
        isPrivate: ""
      },
      isEditing: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editBot = this.editBot.bind(this);
  }

  formatStatus(item) {
    if(IMap.isMap(item)) {
      if(item.get("isStandBy")) {
        return "is standby";
      } else if(item.get("isQualified")) {
        return "is qualified";
      } else if(item.get("isValid")){
        return "is valid";
      } else {
        return "is not valid"
      }
    } else {
      if(item.isStandBy) {
        return "is standby"
      } else if(item.isQualified) {
        return "is qualified";
      } else if(item.isValid) {
        return "is valid";
      } else {
        return "is not valid";
      }
    }
  }

  handleChange(event) {
    this.setState({
      itemEdited: {
        [event.target.name]: event.target.value
      }
    });
  }

  editBot() {
    let item = this.state.itemEdited;
    this.props.onBotEdited(item);
  }

  openModal(modalName, item) {
    this.setState({
      [modalName]: true,
      itemModaled: {
        name: item.get("name"),
        isStandBy: item.get("isValid"),
        isQualified: item.get("isQualified"),
        isValid: item.get("isValid"),
        rank: item.get("rank"),
        isPrivate: item.get("isPrivate"),
        gameName: item.get("gameName"),
        createdAt: item.get("createdAt"),
        updatedAt: item.get("updatedAt")
      }
    })
  }

  toggleEdit() {
    const {isEditing, itemModaled} = this.state;
    if(!isEditing) {
      this.setState({
        itemEdited: {
          name: itemModaled.name,
          isPrivate: itemModaled.isPrivate
        },
      })
    };
    this.setState({
      isEditing: !isEditing
    })
  }

  closeModal(modalName) {
    this.setState({[modalName]: false});
  }


  renderPracticeModal() {
    const { practiceModal } = this.state;
    <ModalContainer
      isOpen={practiceModal}
      onRequestClose={() => this.closeModal("practiceModal")}
      title="Practice your bot"
      description="このbotを練習試合させますか？ボタンを押すと練習が始まります。結果は結果一覧リストに表示されます。"
    >
      <button onClick={(item) => this.props.onPracticeBot(item.botId)} className="button-primary">YES</button>
    </ModalContainer>
  }

  renderBotModal() {
    const { botModal, itemModaled, itemEdited, isEditing } = this.state;
    return(
      <ModalContainer
        isOpen={botModal}
        onRequestClose={() => this.closeModal("botModal")}
        title="Bot's detail"
        description="Botの情報。名前やURLを修正できます。"
      >
        <table className="u-full-width">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{isEditing ?
                <input name="name" type="text" value={itemEdited.name} onChange={this.handleChange}/>
                : itemModaled.name}
              </td>
            </tr>
            <tr>
              <th>isPrivate</th>
              <td>{itemModaled.isPrivate ? "Private" : "Public"}</td>
            </tr>
            <tr>
              <th>GameName</th>
              <td>{itemModaled.gameName}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{this.formatStatus(itemModaled)}</td>
            </tr>
            <tr>
              <th>Rank</th>
              <td>{itemModaled.rank}</td>
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
        {isEditing ?
          <div>
            <button className="button-primary" onClick={this.editBot}>Save</button>
            <button className="button-primary" onClick={this.toggleEdit}>Cansel</button>
          </div>
          : <button className="button-primary" onClick={this.toggleEdit}>Edit</button>
        }

      </ModalContainer>
    )
  }

  render() {
    const { bots, botsLoading } = this.props;
    return(
      <div className="table">
        {this.renderBotModal()}
        {this.renderPracticeModal()}
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
                <tr key={i.get("id")}>
                  <td>{i.get("name")}</td>
                  <td>{status}</td>
                  <td>{i.get("gameName")}</td>
                  <td>
                    <button className="button detail-button margin-top-5" onClick={(e) => this.openModal("botModal", i)}>Detail</button> <button className="practice-button margin-top-5" onClick={() => this.renderPracticeModal(item)}>Practice</button>
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
