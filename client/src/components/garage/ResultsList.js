import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalContainer from '../utils/Modal';

export default class ResultsList extends Component {
  static propTypes = {
    results: PropTypes.object.isRequired,
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
      </div>
    )
  }

  render() {
    const { results } = this.props;
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
            {results.map((i) => {
              return(
                <tr key={i.get("id")}>
                  <td>{i.get("id")}</td>
                  <td>{i.get("gameId")}</td>
                  <td></td>
                  <td></td>
                  <td>
                    <button className="button detail-button margin-top-5" onClick={(e) => this.openModal("detailModal", i)}>Detail</button>
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
