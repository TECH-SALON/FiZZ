import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalContainer from '../utils/Modal';
import {
  Map as IMap, List as IList
} from 'immutable';

export default class ResultsList extends Component {
  static propTypes = {
    results: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      detailModal: false,
      practiceModal: false,
      itemModaled: {
        botName: '',
        gameName: '',
        pointPecentage: '',
        numOfWin: '',
        numOfDraw: '',
        numOfLose: '',
        createdAt: '',
      },
      participants: IList()
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.participants.size != 0) {
      this.setState({
          participants: nextProps.participants
      })
    }
  }
  openModal(modalName, item) {
    let resultId = item.get("resultId");
    let gameName = item.get("gameName");
    let botId = item.get("botId");
    this.props.onGetResult(resultId, gameName, botId);
    this.setState({
      [modalName]: true,
      itemModaled: {
        botName: item.get("botName"),
        gameName: item.get("gameName"),
        pointPecentage: item.get("pointPecentage"),
        numOfWin: item.get("numOfWin"),
        numOfDraw: item.get("numOfDraw"),
        numOfLose: item.get("numOfLose"),
        createdAt: item.get("createdAt"),
      }
    })
  }

  closeModal(modalName) {
    this.setState({[modalName]: false});
  }

  renderModals() {
    const { itemModaled, participants } = this.state;
    return(
      <div>
        <ModalContainer
          isOpen={this.state.detailModal}
          onRequestClose={() => this.closeModal("detailModal")}
          title="Result detail"
          description="対戦結果の詳細"
        >
          <div>
            <p>対戦情報</p>
            <table className="u-full-width">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{itemModaled.botName}</td>
                </tr>
                <tr>
                  <th>GameName</th>
                  <td>{itemModaled.gameName}</td>
                </tr>
                <tr>
                  <th>Win%</th>
                  <td>{itemModaled.pointPecentage}</td>
                </tr>
                <tr>
                  <th>Win</th>
                  <td>{itemModaled.numOfWin}</td>
                </tr>
                <tr>
                  <th>Lose</th>
                  <td>{itemModaled.numOfLose}</td>
                </tr>
                <tr>
                  <th>Draw</th>
                  <td>{itemModaled.numOfDraw}</td>
                </tr>
                <tr>
                  <th>createdAt</th>
                  <td>{itemModaled.createdAt}</td>
                </tr>
              </tbody>
            </table>
            <p>対戦相手</p>
            <table className="u-full-width">
              {
                participants.map(p => {
                  return(
                    <tbody key={p.get("id")}>
                      <tr key={p.get("name")}>
                        <th>Name</th>
                        <td>{p.get("name")}</td>
                      </tr>
                      <tr key={p.get("username")}>
                        <th>Author</th>
                        <td>{p.get("username")}</td>
                      </tr>
                      <tr key={p.get("imageUrl")}>
                        <th>Image</th>
                        <td><img src={p.get("imageUrl")}/></td>
                      </tr>
                      <tr key={p.get("description")}>
                        <th>Description</th>
                        <td>{p.get("description")}</td>
                      </tr>
                    </tbody>
                  )
                })
              }
            </table>
          </div>
          <button className="button-primary">LOG</button>
        </ModalContainer>
      </div>
    )
  }

  render() {
    const { results, resultsLoading } = this.props;
    return(
      <div className="table">
        {this.renderModals()}
        <table className="u-full-width">
          <thead>
            <tr>
              <th>Name</th>
              <th>Game</th>
              <th>%</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resultsLoading ? <tr><td>Results data is loading now....</td></tr> : null}
            {results.map((i) => {
              return(
                <tr key={i.get("resultId")}>
                  <td>{i.get("botName")}</td>
                  <td>{i.get("gameName")}</td>
                  <td>{(i.get("pointPercentage"))*100+"%"}</td>
                  <td>{i.get("createdAt")}</td>
                  <td>
                    <button className="button detail-button margin-top-5" onClick={(e) => {this.openModal("detailModal", i)}}>Detail</button>
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
