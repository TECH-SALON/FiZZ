// ログインしていないユーザー向けのナビゲーションメニュー

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import whiteLogo from '../../assets/utils/logo-white.svg';
import Logo from '../../assets/utils/logo.svg';

export default class VisitorNav extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }


  render() {
    return(
      <div className="visitor-nav">
        <div className="container">
          <div className="logo-nav">
            <Link to="/">
              <div className="logo">
                <img id="nav-logo" src={whiteLogo}/>
              </div>
            </Link>
          </div>
          <div className="menu-top">
            <ul>
              <li><Link to="/garage">Garage</Link></li>
              <li><Link to="/match">Match</Link></li>
              <li><Link to="/match">Docs</Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
