// ログインしていないユーザー向けのナビゲーションメニュー

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import logoBlue from '../../assets/utils/logo.svg';
import logoWhite from '../../assets/utils/logo_white.svg';



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
  renderTopPageMenu() {
    return(
      <ul className="top-page-menu">
        <li><Link to="/">Top</Link></li>
        <li><Link to="/garage">Garage</Link></li>
        <li><Link to="/match">Match</Link></li>
        <li><Link to="/docs">Docs</Link></li>
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
            { this.isTopPage() ? this.renderTopPageMenu() : this.renderUtilityMenu()}
          </div>
        </div>
      </div>
    )
  }
}
