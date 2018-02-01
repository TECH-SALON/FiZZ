import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CircularProgressbar from 'react-circular-progressbar';
import Modal from 'react-modal';


export default class RegisterModal extends Component {

  // static propTypes = {
  //   bots: PropTypes.object.isRequired,
  //   onStandBot: PropTypes.func.isRequired,
  //   onRegisterBot: PropTypes.func.isRequired,
  //   onSetup: PropTypes.func.isRequired
  // }

  constructor() {
    super();
    this.state = {
      progress: 0,
      botName: "",
      gameName: "",
      runtime: "",
      // isPrivate: "",
      resourceUrl: "",
      description: ""
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let bot = {
      name: this.state.botName,
      runtime: this.state.runtime,
      gameName: this.state.gameName,
      resourceUrl: this.state.resourceUrl,
      // isPrivate: this.state.isPrivate,
      description: this.state.description
    };
    this.props.onCreateBot(bot);
    this.setState({
      progress: 20,
      loading: true,
      name: "",
      runtime: "",
      // isPrivate: "",
      gameId: 0,
      resourceUrl: "",
      description: "",
    });
    setTimeout(() => {
      this.setState({
        progress: 50
      })
    },300)
  }

  renderForm() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="form-element">
          <label htmlFor="botName">Bot name:</label>
          <input required minLength="3" pattern="^([a-zA-Z]\w{3,10}[a-zA-Z0-9])$" title="Please check your input." name="botName" value={this.state.botName} onChange={this.handleChange} className="u-full-width" type="text" placeholder="bot name" id="botName"/>
        </div>
        <div className="form-element">
          <label htmlFor="repositoryUrl">Repository URL:</label>
          <input required pattern="https?://.+" name="resourceUrl" value={this.state.resourceUrl} onChange={this.handleChange} className="u-full-width" type="url" placeholder="repository resourceUrl" id="repositoryUrl"/>
        </div>
        <div className="form-element">
          <label htmlFor="gameName">Game name:</label>
          <select required name="gameName" value={this.state.gameName} onChange={this.handleChange} className="u-full-width">
            <option value="">Please select</option>
            <option value="reversi">Reversi</option>
          </select>
        </div>
        <div className="form-element">
          <label htmlFor="runtime">Public or Private:</label>
            <input required name="runtime" type="radio" value="python3.6" onChange={this.handleChange} style={{'marginRight':10}}/>
            Python3.6
            <input required name="runtime" type="radio" value="node--" onChange={this.handleChange} style={{'marginLeft':10, 'marginRight':10}}/>
            NodeJS
            <input required name="runtime" type="radio" value="golang1.9" onChange={this.handleChange} style={{'marginLeft':10, 'marginRight':10}}/>
            Go1.9
        </div>
        {/* <div className="form-element">
          <label htmlFor="isPrivate">Public or Private:</label>
            <input required name="isPrivate" type="radio" value="public" onChange={this.handleChange} style={{'marginRight':10}}/>
            Public
            <input required name="isPrivate" type="radio" value="private" onChange={this.handleChange} style={{'marginLeft':10, 'marginRight':10}}/>
            Private
        </div> */}
        <div className="form-element">
          <label htmlFor="botComment">Comment:</label>
          <textarea name="description" value={this.state.description} onChange={this.handleChange} className="u-full-width" placeholder="このBotの説明" id="botComment"></textarea>
        </div>
        <div className="form-element">
          <button className="modal-submit-button" type="submit" value="Submit">SUBMIT</button>
        </div>
      </form>
    )
  }
  renderProgress(createCompleted) {
    if(createCompleted) {
      setTimeout(() => {
        this.setState({
          loading: false,
          modalIsOpen: false
        })
      },1500)
    }
    return(
      <div className="progress-container">
        <CircularProgressbar
          strokeWidth={6}
          percentage={createCompleted ? 100 : this.state.progress}
          textForPercentage={(percentage) => {
               return percentage === 100 ? `${percentage}%!!` : `${percentage}%`;
             }}
        />
      </div>
    )
  }

  render() {
    const { loading } = this.state;
    const { createCompleted } = this.props;
    return(
      <div>
        <button className="button-primary" onClick={this.openModal}>Add New</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          className="modal"
          closeTimeoutMS={350}
          overlayClassName="modal-overlay"
        >
          <div className="modal-header">
            <h3>CREATE FORM</h3>
            <p>Add your bot.</p>
          </div>
          <div className="modal-content">
            {loading ? this.renderProgress(createCompleted) : this.renderForm()}
          </div>
        </Modal>
      </div>
    )
  }
}
