// ログインしていないユーザー向けのナビゲーションメニュー

import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupUsername: "",
      signupEmail: "",
      signupPassword: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  componentWillMount() {
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSignup(event) {
    event.preventDefault();
    let auth = {
      username: this.state.signupUsername,
      email: this.state.signupEmail,
      password: this.state.signupPassword,
    };
    this.props.onSignup(auth);
    this.setState({
      signupUsername: "",
      signupEmail: "",
      signupPassword: "",
    });
  }


  render() {
    return(
      <div className="signup-form">
        <h3>SignUp</h3>
        <p>Create your new account manually:<br/>
        <a href="#" onClick={this.props.onToggleForm}>Do you have your account already?</a>
        </p>
        <form onSubmit={this.handleSignup}>
          <label htmlFor="signupUsername">Username</label>
          <input name="signupUsername" value={this.state.signupUsername} onChange={this.handleChange} className="u-full-width" type="text" placeholder="Your username is here" id="signupUsername"/>
          <label htmlFor="signupEmail">Email</label>
          <input name="signupEmail" value={this.state.signupEmail} onChange={this.handleChange} className="u-full-width" type="email" placeholder="email" id="signupEmail"/>
          <label htmlFor="signupPassword">Password</label>
          <input name="signupPassword" value={this.state.signupPassword} onChange={this.handleChange} className="u-full-width" type="password" placeholder="password" id="signupPassword"/>
          <input className="button-primary" type="submit" value="SignUp"/>
        </form>
      </div>
    )
  }
}
