// ログインしていないユーザー向けのナビゲーションメニュー

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import logo from '../../assets/utils/logo.svg';
import logoIcon from '../../assets/utils/logo_icon.svg';
import logoWhite from '../../assets/utils/logo_white.svg';



export default class VisitorNav extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let navBar = document.getElementById("navbar");
    let navLogo = document.getElementById("nav-logo")
    window.onscroll = () => {
      if (window.pageYOffset > 700) {
        navBar.className = "navbar navbar-fixed";
        navLogo.src = logo;
      } else {
        navBar.className = "navbar";
        navLogo.src = logoWhite;
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
            <ul>
              <li><Link to="/">Top</Link></li>
              <li><Link to="/garage">Garage</Link></li>
              <li><Link to="/match">Match</Link></li>
              <li><Link to="/docs">Docs</Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
