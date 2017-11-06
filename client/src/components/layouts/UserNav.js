// ログイン済みユーザー向けのナビゲーション

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/utils/logo.svg';
import UserActions from '../../actions/UserActions';

export default class UserNav extends Component {
  onSignOut() {
    UserActions.signOut();
  }
  render() {
    return(
      <div className="user-nav">
        <div className="container">
          <div className="logo-nav">
            <Link to="/">
              <div className="logo">
                <img id="nav-logo" src={Logo}/>
              </div>
            </Link>
          </div>
          <div className="menu-top">
            <ul>
              <li><a className='button' onClick={this.onSignOut}>logout</a></li>
              <li><Link to="/garage">Garage</Link></li>
              {/* <li><Link to="/practice">Practice</Link></li> */}
              <li><Link to="/battle">Battle</Link></li>
              {/* <li><Link to="/forum">Forum</Link></li> */}
              {/* <li><Link to="/docs">Docs</Link></li> */}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
