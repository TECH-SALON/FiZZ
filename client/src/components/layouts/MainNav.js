// ログインしていないユーザー向けのナビゲーションメニュー

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ModalContainer from '../utils/Modal';
import logoBlue from '../../assets/utils/logo.svg';
import logoWhite from '../../assets/utils/logo_white.svg';
import Popover from 'material-ui/Popover';

import {
  Map as IMap
} from 'immutable';

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileMenu: false,
      profileModal: false,
    };
    this.openProfile = this.openProfile.bind(this);
    this.closeProfile = this.closeProfile.bind(this);
    this.openProfileMenu = this.openProfileMenu.bind(this);
    this.closeProfileMenu = this.closeProfileMenu.bind(this);
    this.logout = this.logout.bind(this);
  }
  checkCurrentPath() {
    switch(location.pathname){
      case "/garage":
        return "garage"
      case "/match":
        return "match"
      case "/docs":
        return "docs"
      default:
        return
    }
  }
  openProfile() {
    this.setState({
      profileMenu: false,
      profileModal: true
    })
  }
  closeProfile() {
    this.setState({
      profileModal: false
    })
  }
  openProfileMenu(event) {
    this.setState({
      profileMenu: true,
      anchorEl: event.currentTarget
    });
  }
  closeProfileMenu(event) {
    this.setState({
      profileMenu: false,
    });
  }
  logout() {
    const tokens = this.props.tokens.toJS();
    this.props.onLogout(tokens);
  }

  renderProfileModal() {
    const { profileModal } = this.state;
    return(
      <div>
        <ModalContainer
          isOpen={profileModal}
          onRequestClose={this.closeProfile}
          title="Profile"
        >
          <div>
            <img src="https://avatars3.githubusercontent.com/u/8210889?s=460&v=4"/>
            <p>Toshiaki Shishimi</p>
            <p>toshi443</p>
            <p>toshi.443.aki@gmail.com</p>
            <button className="button-primary">Edit</button>
          </div>
        </ModalContainer>
      </div>
    )
  }
  renderProfileMenu() {
    return(
      <Popover
        open={this.state.profileMenu}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onRequestClose={this.closeProfileMenu}
      >
        {/* <div className="logoutPop">
          <a className="logout-button" onClick={this.logout}>Logout</a>
        </div> */}
        <div className="profile-menu-list">
          <ul>
            <li onClick={this.openProfile}><i className="material-icons">face</i>Profile</li>
            <li><i className="material-icons">build</i>Settings</li>
            <li onClick={this.logout}><i className="material-icons">power_settings_new</i>Logout</li>
          </ul>
        </div>
      </Popover>
    )
  }
  render() {
    return(
      <div id="main-nav">
        {this.renderProfileModal()}
        {this.renderProfileMenu()}
        <div className="container">
          <div className="logo-nav">
            <Link to="/">
              <div className="logo">
                <img id="nav-logo" src={logoWhite}/>
              </div>
            </Link>
          </div>
          <div className="utility-menu">
            <ul>
              <li className={this.checkCurrentPath() == "garage" ? "current-page" : ""}><Link to="/garage"><i className="material-icons">home</i><br/>GARAGE</Link></li>
              <li className={this.checkCurrentPath() == "match" ? "current-page" : ""}><Link to="/match"><i className="material-icons">videogame_asset</i><br/>GAMES</Link></li>
              <li className={this.checkCurrentPath() == "docs" ? "current-page" : ""}><Link to="/docs"><i className="material-icons">description</i><br/>DOCS</Link></li>
            </ul>
            {/* <ul>
              <li><i className="material-icons">home</i><br/>GARAGE</li>
              <li><i className="material-icons" onClick={this.openProfile}>videogame_asset</i><br/>GAMES</li>
              <li><i className="material-icons" onClick={this.openLogoutPop}>description</i><br/>DOCS</li>
            </ul> */}
          </div>
          <div className="profile-menu">
            <div className="avator-icon" onClick={this.openProfileMenu}>
              <img src="https://avatars3.githubusercontent.com/u/8210889?s=460&v=4"/><br/>
              <i className="material-icons">expand_more</i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
