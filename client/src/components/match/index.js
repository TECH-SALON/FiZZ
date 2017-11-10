import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Match extends Component {
  // static propTypes = {
  //
  // }

  componentWillMount(){
    this.props.onSetup();
  }

  render() {
    return(
      <div className="match">
        <div className="container">
          <h2>Match page</h2>
        </div>
      </div>
    )
  }
}
