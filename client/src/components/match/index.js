import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Link} from 'react-router';

import Games from './Games';
import Reversi from './Reversi';

export default class Match extends Component {
  static propTypes = {
  }

  componentWillMount(){
    this.props.onSetup();
  }

  renderRoutes() {
    return(
      <Switch>
        <Route exact path="/match" render={() => <Games />}/>
        <Route path="/match/reversi" render={() => <Reversi bots={this.props.bots} results={this.props.results}/>}/>
      </Switch>
    )
  }
  render() {
    return(
      <div className="match">
        <div className="contents-body">
          <div className="container">
            {this.renderRoutes()}
          </div>
        </div>
      </div>
    )
  }
}
