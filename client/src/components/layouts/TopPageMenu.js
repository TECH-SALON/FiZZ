// ログインしていないユーザー向けのナビゲーションメニュー

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import ModalContainer from '../utils/Modal';
import Signup from '../auth/Signup';
import Login from '../auth/Login';


export default class TopPageMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      loginForm: true,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  componentWillMount() {
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    })
  }
  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  }

  toggleForm() {
    let bool = this.state.loginForm;
    this.setState({
      loginForm: !bool,
    })
  }

  renderModal() {
    const { modalIsOpen, loginForm } = this.state;
    return(
      <div>
        <ModalContainer
          isOpen={modalIsOpen}
          onRequestClose={() => this.closeModal()}
        >
          {loginForm ?
            <Login onLogin={this.props.onLogin} onToggleForm={this.toggleForm}/>
            :
            <Signup onSignup={this.props.onSignup} onToggleForm={this.toggleForm}/>
          }
        </ModalContainer>
      </div>
    )
  }
  render() {
    return(
      <div>
        {this.renderModal()}
        <ul className="top-page-menu">
          <li><Link to="/">Top</Link></li>
          <li><Link to="/garage">Garage</Link></li>
          <li><Link to="/match">Match</Link></li>
          <li><Link to="/docs">Docs</Link></li>
          <li><a className="login-button" onClick={this.openModal}>Sign in</a></li>
        </ul>
      </div>

    )
  }
}
