import React, { Component } from 'react';


export default class SignUp extends Component {
  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="email" value={this.state.value} onChange={this.handleChange}/>
          </label>
          <label>
            Password:
            <input type="Password" value={this.state.value} onChange={this.handleChange}/>
          </label>
          <input class="button-primary" type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}
