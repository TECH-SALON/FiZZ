import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Link} from 'react-router-dom';

export default class Games extends Component {
  static propTypes = {

  }

  componentWillMount(){
    // console.log("hello")
  }


  render() {
    return(
      <div className="games">
        <div className="games-back-image"></div>
        <div className="row margin-top-25">
          <h1 className="page-title">Match</h1>
          <div className="page-menu">
            <ul>
              <li><Link to="/garage">Garage</Link></li>
              <li><Link to="/match">Match</Link></li>
              <li><Link to="/docs">Docs</Link></li>
            </ul>
          </div>
        </div>
        <div className="row margin-top-25">
          <div className="four columns">
            <div className="panel">
              <div className="panel-heading">
                <h3>Reversi</h3>
              </div>
              <div className="margin-top-15">
                <Link to="/match/reversi" className="button button-primary">Go</Link>
              </div>
            </div>
          </div>
          <div className="four columns">
            <div className="panel">
              <div className="panel-heading">
                <h3>Coming soon</h3>
              </div>
              <div className="margin-top-15">
              </div>
            </div>
          </div>
          <div className="four columns">
            <div className="panel">
              <div className="panel-heading">
                <h3>Coming soon</h3>
              </div>
              <div className="margin-top-15">
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
