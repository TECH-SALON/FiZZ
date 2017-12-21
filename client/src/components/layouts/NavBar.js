// ログインしていないユーザー向けのナビゲーションメニュー

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import logoBlue from '../../assets/utils/logo.svg';
import logoWhite from '../../assets/utils/logo_white.svg';
import Popover from 'material-ui/Popover';
import ModalContainer from '../utils/Modal';
import TopPageNav from './TopPageNav';
import MainNav from './MainNav';
import Signup from '../auth/Signup';
import Login from '../auth/Login';


export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  isTopPage() {
    if (location.pathname == "/") {
      return true
    } else {
      return false
    }
  }

  render() {
    return(
      <div id="navbar">
        { this.isTopPage() ? <TopPageNav onSignup={this.props.onSignup} onLogin={this.props.onLogin}/> : <MainNav /> }
      </div>
    )
  }
}
