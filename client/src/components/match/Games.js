import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Link} from 'react-router-dom';
import reversiCover from '../../assets/games/reversi/reversi_cover.svg';


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
        <div className="row margin-top-50">
          <div className="four columns">
            <div className="panel">
              <div className="panel-image">
                <img src={reversiCover}/>
              </div>
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
