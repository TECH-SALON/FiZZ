import React, { Component } from 'react';


export default class DashBoard extends Component {
  render() {
    const { thanks } = this.props;
    return (
      <div className="dashboard">
        <div className="container">
          <h1>Hello FiZZ.</h1>
          <h2>{thanks}</h2>
        </div>
      </div>
    )
  }
}
