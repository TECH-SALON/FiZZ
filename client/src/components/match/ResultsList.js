import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalContainer from '../utils/Modal';

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
        name: item.get("botName"),
        winPercentage: item.get("pointPercentage"),
        createdAt: item.get("createdAt")
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
        <ModalContainer
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.closeModal()}
          title="Result detail"
          description="Result"
        >
          <ul>
            <li>{result.name}</li>
            <li>{result.winPercentage}</li>
            <li>{result.createdAt}</li>
          </ul>
        </ModalContainer>
      </div>
    )
  }
  render() {
    const { results } = this.props;
    return(
      <div className="table">
        {this.renderModal()}
        <table className="u-full-width">
          <thead>
            <tr>
              <th>Name</th>
              <th>Win%</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map(item => {
              return(
                <tr key={item.get("id")}>
                  <td>{item.get("botName")}</td>
                  <td>{item.get("pointPercentage")*100+"%"}</td>
                  <td>{item.get("createdAt")}</td>
                  <td>
                    <button className="button detail-button margin-top-5" onClick={(e) => this.openModal(item)}>Detail</button>
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
