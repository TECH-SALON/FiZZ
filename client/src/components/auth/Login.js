// ログインしていないユーザー向けのナビゲーションメニュー
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUsername: "",
      loginPassword: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
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

  render() {
    return(
      <div className="login-form">
        <h3>Sign in</h3>
        <p>Sign in or sign up with one click:<br/>
        <a href="#" onClick={this.props.onToggleForm}>or manually create a new account</a>
        </p>
        <button>Google</button><span>　</span>
        <button>Facebook</button><span>　</span>
        <button>Twitter</button>
        <hr/>
        <p>Use your FiZZ username and password</p>
        <form onSubmit={this.handleLogin}>
          <label htmlFor="loginUsername">Username</label>
          <input name="loginUsername" value={this.state.loginUsername} onChange={this.handleChange} className="u-full-width" type="text" placeholder="Your username is here" id="loginUsername"/>
          <label htmlFor="loginPassword">Password</label>
          <input name="loginPassword" value={this.state.loginPassword} onChange={this.handleChange} className="u-full-width" type="password" placeholder="password" id="loginPassword"/>
          <input className="button-primary margin-top-25" type="submit" value="Login"/>
        </form>
      </div>
    )
  }
}