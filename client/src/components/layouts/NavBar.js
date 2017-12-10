// ログインしていないユーザー向けのナビゲーションメニュー

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import logoBlue from '../../assets/utils/logo.svg';
import logoWhite from '../../assets/utils/logo_white.svg';
import Popover from 'material-ui/Popover';
import ModalContainer from '../utils/Modal';
import TopPageMenu from './TopPageMenu';
import UtilityMenu from './UtilityMenu';
import Signup from '../auth/Signup';
import Login from '../auth/Login';


export default class VisitorNav extends Component {
  constructor(props) {
    super(props);
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



  render() {
    return(
      <div id="navbar" className="navbar">
        <div className="container">
          <div className="logo-nav">
            <Link to="/">
              <div className="logo">
                <img id="nav-logo" src={logoWhite}/>
              </div>
            </Link>
          </div>
          <div className="menu-top">
            { this.isTopPage() ? <TopPageMenu onSignup={this.props.onSignup}/> : <UtilityMenu onLogout={this.props.onLogout}/>}
          </div>
        </div>
      </div>
    )
  }
}
