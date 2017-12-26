// ログインしていないユーザー向けのナビゲーションメニュー
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

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
      username: this.state.loginUsername,
      password: this.state.loginPassword,
    };
    this.props.onLogin(auth);
    this.setState({
      loginUsername: "",
      loginPassword: "",
    });
  }

  responseGoogle(response){
    console.log(response);
  }

  render() {
    return(
      <div className="login-form">
        <h3>Sign in</h3>
        <p>Sign in or sign up with one click:<br/>
        <a href="#" onClick={this.props.onToggleForm}>or manually create a new account</a>
        </p>
        {/* <button>Google</button><span>　</span>
        <button>Facebook</button><span>　</span>
        <button>Twitter</button>
        <GoogleLogin
          clientId="897071335358-9dqqmar2u5c4fbo48kujh92jbb58amu9.apps.googleusercontent.com"
          buttonText="Login"
          redirectUri="https://fizz.auth.us-east-1.amazoncognito.com/oauth2/idpresponse"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        /> */}
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
