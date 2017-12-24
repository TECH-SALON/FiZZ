import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ModalContainer from '../utils/Modal';
import CircularProgressbar from 'react-circular-progressbar';


export default class RegisterForm extends Component {

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
      isPrivate: false,
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
      username: "sampleUser",
      name: this.state.botName,
      gameName: this.state.gameName,
      resourceUrl: this.state.resourceUrl,
      description: this.state.description
    };
    this.props.onCreateBot(bot);
    this.setState({
      progress: 20,
      loading: true,
      botName: "",
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
      <form>
        <label htmlFor="botName">Bot name:</label>
        <input name="botName" value={this.state.botName} onChange={this.handleChange} className="u-full-width" type="text" placeholder="bot name" id="botName"/>
        <label htmlFor="repositoryUrl">Repository URL:</label>
        <input name="resourceUrl" value={this.state.resourceUrl} onChange={this.handleChange} className="u-full-width" type="text" placeholder="repository resourceUrl" id="repositoryUrl"/>
        <label htmlFor="gameName">Game name:</label>
        <select name="gameName" value={this.state.gameName} onChange={this.handleChange} className="u-full-width">
          <option>Please select</option>
          <option value="Reversi">Reversi</option>
        </select>
        <label htmlFor="botComment">Comment:</label>
        <textarea name="description" value={this.state.description} onChange={this.handleChange} className="u-full-width" placeholder="このBotの説明" id="botComment"></textarea>
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
      },2000)
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
        <ModalContainer
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          onSubmit={this.handleSubmit}
          title="Add your Bot"
          description="Botを登録しましょう"
          loading={loading}
        >
          {loading ? this.renderProgress(createCompleted) : this.renderForm()}
        </ModalContainer>
      </div>
    )
  }
}
