// ログインしていないユーザー向けのナビゲーションメニュー

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Popover from 'material-ui/Popover';

export default class VisitorNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutPop: false,
    };
    this.openLogoutPop = this.openLogoutPop.bind(this);
    this.closeLogoutPop = this.closeLogoutPop.bind(this);
    this.logout = this.logout.bind(this);
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

  render() {
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
}
