import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalContainer from '../utils/Modal';

export default class BotsList extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      item: {
        name: '',
        status: '',
        rank: '',
      }
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(item) {
    this.setState({
      modalIsOpen: true,
      item: {
        name: item.get("name"),
        isStandBy: item.get("isStandBy"),
        rank: item.get("rank")
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
        <ModalContainer
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.closeModal()}
          title="Bot's detail"
          description="Botの情報。名前やURLを修正できます。"
        >
          <table className="u-full-width">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{item.name}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{item.gameName}</td>
              </tr>
              <tr>
                <th>Rank</th>
                <td>{item.rank}</td>
              </tr>
            </tbody>
          </table>
          <button className="button-primary">Edit</button>
        </ModalContainer>
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
              <th>Status</th>
              <th>Win%</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bots.map(item => {
              return(
                <tr key={item.get("id")}>
                  <td>{item.get("name")}</td>
                  <td>{item.get("isStandBy")}</td>
                  <td>{item.get("rank")}</td>
                  <td><button className="button detail-button margin-top-5" onClick={(e) => this.openModal(item)}>Detail</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
