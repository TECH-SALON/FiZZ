// ログインしていないユーザー向けのナビゲーションメニュー

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import logoBlue from '../../assets/utils/logo.svg';
import logoWhite from '../../assets/utils/logo_white.svg';
import Popover from 'material-ui/Popover';
import ModalContainer from '../utils/Modal';
import Signup from '../auth/Signup';
import Login from '../auth/Login';


export default class VisitorNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      loginForm: true,
      logoutPop: false,
      loginUsername: "",
      loginPassword: "",
      signupUsername: "",
      signupEmail: "",
      signupPassword: ""
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.openLogoutPop = this.openLogoutPop.bind(this);
    this.closeLogoutPop = this.closeLogoutPop.bind(this);
    this.logout = this.logout.bind(this);
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

  openLogoutPop(event) {
    this.setState({
      logoutPop: true,
      anchorEl: event.currentTarget
    });
  }
  closeLogoutPop(event) {
    this.setState({
      logoutPop: false,
    });
  }
  logout() {
    alert("You logout")
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

  toggleForm() {
    let bool = this.state.loginForm;
    this.setState({
      loginForm: !bool,
    })
  }

  renderTopPageMenu() {
    return(
      <ul className="top-page-menu">
        <li><Link to="/">Top</Link></li>
        <li><Link to="/garage">Garage</Link></li>
        <li><Link to="/match">Match</Link></li>
        <li><Link to="/docs">Docs</Link></li>
        <li><a className="login-button" onClick={this.openModal}>Sign in</a></li>
      </ul>
    )
  }

  renderUtilityMenu() {
    return(
      <div>
        <ul className="utility-menu">
          <li><i className="material-icons">notifications</i></li>
          <li><i className="material-icons">account_circle</i></li>
          <li><i className="material-icons" onClick={this.openLogoutPop}>power_settings_new</i></li>
        </ul>
        <Popover
          open={this.state.logoutPop}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onRequestClose={this.closeLogoutPop}
        >
          <div className="logoutPop">
            <a className="logout-button" onClick={this.logout}>Logout</a>
          </div>
        </Popover>
      </div>

    )
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
