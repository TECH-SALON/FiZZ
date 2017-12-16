// ログインしていないユーザー向けのナビゲーションメニュー

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import ModalContainer from '../utils/Modal';
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import logoBlue from '../../assets/utils/logo.svg';
import logoWhite from '../../assets/utils/logo_white.svg';


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

  componentDidMount() {
    this.adjustNav(600, logoWhite, logoBlue);
  }

  adjustNav(fixAfter, defaultLogo, fixedLogo) {
    let navBar = document.getElementById("top-page-nav");
    let navLogo = document.getElementById("nav-logo");
    window.onscroll = () => {
      if (window.pageYOffset > fixAfter) {
        navBar.classList.add("navbar-fixed");
        navLogo.src = fixedLogo;
      } else {
        navBar.classList.remove("navbar-fixed");
        navLogo.src = defaultLogo;
      }
    }
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
      <div id="top-page-nav">
        <div className="container">
          <div className="logo-nav">
            <Link to="/">
              <div className="logo">
                <img id="nav-logo" src={logoWhite}/>
              </div>
            </Link>
          </div>
          <div className="menu-top">
            {this.renderModal()}
            <ul>
              <li><Link to="/">Top</Link></li>
              <li><Link to="/garage">Garage</Link></li>
              <li><Link to="/match">Match</Link></li>
              <li><Link to="/docs">Docs</Link></li>
              <li><a className="login-button" onClick={this.openModal}>Sign in</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
