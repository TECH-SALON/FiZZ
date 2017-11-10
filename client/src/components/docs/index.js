import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Docs extends Component {
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
          <h2>Docs page</h2>
        </div>
      </div>
    )
  }
}
