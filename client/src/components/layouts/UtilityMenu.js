// ログインしていないユーザー向けのナビゲーションメニュー

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Popover from 'material-ui/Popover';
import ModalContainer from '../utils/Modal';


export default class VisitorNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileModal: false,
      logoutPop: false,
    };
    this.openProfile = this.openProfile.bind(this);
    this.closeProfile = this.closeProfile.bind(this);
    this.openLogoutPop = this.openLogoutPop.bind(this);
    this.closeLogoutPop = this.closeLogoutPop.bind(this);
    this.logout = this.logout.bind(this);
  }

  openProfile() {
    this.setState({
      profileModal: true
    })
  }
  closeProfile() {
    this.setState({
      profileModal: false
    })
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
    this.props.onLogout();
    alert("You logout")
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
  renderPopOver() {
    return(
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
    )
  }
  render() {
    return(
      <div>
        {this.renderProfileModal()}
        {this.renderPopOver()}
        <ul className="utility-menu">
          <li><i className="material-icons">notifications</i></li>
          <li><i className="material-icons" onClick={this.openProfile}>account_circle</i></li>
          <li><i className="material-icons" onClick={this.openLogoutPop}>power_settings_new</i></li>
        </ul>
      </div>
    )
  }
}
