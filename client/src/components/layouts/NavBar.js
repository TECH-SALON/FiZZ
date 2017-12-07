// ログインしていないユーザー向けのナビゲーションメニュー

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import logoBlue from '../../assets/utils/logo.svg';
import logoWhite from '../../assets/utils/logo_white.svg';
import ModalContainer from '../utils/Modal';


export default class VisitorNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      loginUsername: "",
      loginPassword: "",
      signupUsername: "",
      signupEmail: "",
      signupPassword: ""
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    if (this.isTopPage()) {
      this.adjustNav(600, logoWhite, logoBlue);
    }
  }

  isTopPage() {
    if (location.pathname == "/") {
      return true
    } else {
      return false
    }
  }
  adjustNav(fixAfter, defaultLogo, fixedLogo) {
    let navBar = document.getElementById("navbar");
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleLogin(event) {
    event.preventDefault();
    let auth = {
      loginUsername: this.state.loginUsername,
      loginPassword: this.state.loginPassword,
    };
    this.props.onLogin(auth);
    this.setState({
      loginUsername: "",
      loginPassword: "",
    });
  }


  handleSignup(event) {
    event.preventDefault();
    let auth = {
      signupUsername: this.state.signupUsername,
      signupEmail: this.state.signupEmail,
      signupPassword: this.state.signupPassword,
    };
    this.props.onSignup(auth);
    this.setState({
      signupUsername: "",
      signupEmail: "",
      signupPassword: "",
    });
  }



  renderTopPageMenu() {
    return(
      <ul className="top-page-menu">
        <li><Link to="/">Top</Link></li>
        <li><Link to="/garage">Garage</Link></li>
        <li><Link to="/match">Match</Link></li>
        <li><Link to="/docs">Docs</Link></li>
        <li><a className="login-button" onClick={this.openModal}>Login/SignUp</a></li>
      </ul>
    )
  }
  renderUtilityMenu() {
    return(
      <ul className="utility-menu">
        <li><i className="material-icons">notifications</i></li>
        <li><i className="material-icons">account_circle</i></li>
        <li><i className="material-icons">power_settings_new</i></li>
      </ul>
    )
  }

  renderModal() {
    const { modalIsOpen } = this.state;
    return(
      <div>
        <ModalContainer
          isOpen={modalIsOpen}
          onRequestClose={() => this.closeModal()}
          title="Login/SignUp"
        >
          <h4>Login</h4>
          <form onSubmit={this.handleLogin}>
            <label htmlFor="loginUsername">Username</label>
            <input name="loginUsername" value={this.state.loginUsername} onChange={this.handleChange} className="u-full-width" type="text" placeholder="Your username is here" id="loginUsername"/>
            <label htmlFor="loginPassword">Password</label>
            <input name="loginPassword" value={this.state.loginPassword} onChange={this.handleChange} className="u-full-width" type="password" placeholder="password" id="loginPassword"/>
            <input className="button-primary" type="submit" value="Login"/>
          </form>
          <hr/>
          <h4>SignUp</h4>
          <form onSubmit={this.handleSignup}>
            <label htmlFor="signupUsername">Username</label>
            <input name="signupUsername" value={this.state.signupUsername} onChange={this.handleChange} className="u-full-width" type="text" placeholder="Your username is here" id="signupUsername"/>
            <label htmlFor="signupEmail">Password</label>
            <input name="signupEmail" value={this.state.signupEmail} onChange={this.handleChange} className="u-full-width" type="email" placeholder="email" id="signupEmail"/>
            <label htmlFor="signupPassword">Password</label>
            <input name="signupPassword" value={this.state.signupPassword} onChange={this.handleChange} className="u-full-width" type="password" placeholder="password" id="signupPassword"/>
            <input className="button-primary" type="submit" value="SignUp"/>
          </form>
        </ModalContainer>
      </div>
    )
  }
  render() {
    return(
      <div id="navbar" className="navbar">
        {this.renderModal()}
        <div className="container">
          <div className="logo-nav">
            <Link to="/">
              <div className="logo">
                <img id="nav-logo" src={logoWhite}/>
              </div>
            </Link>
          </div>
          <div className="menu-top">
            { this.isTopPage() ? this.renderTopPageMenu() : this.renderUtilityMenu()}
          </div>
        </div>
      </div>
    )
  }
}
