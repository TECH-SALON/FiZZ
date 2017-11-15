import React, {Component} from 'react';
import {render} from 'react-dom'

import {connect} from 'react-redux';
import {Route, Switch, Link} from 'react-router';

import NavBar from '../components/layouts/Navbar';
import TopPage from '../components/statics/TopPage';
import GarageContainer from './GarageContainer';
import MatchContainer from './MatchContainer';
import DocsContainer from './DocsContainer';


class RootContainer extends Component {
  componentWillMount() {
    let location = this.props.location
  }
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
            <Route exact path="/" component={TopPage}/>
            <Route path="/garage" component={GarageContainer}/>
            <Route path="/match" component={MatchContainer}/>
            <Route path="/docs" component={DocsContainer}/>
        </Switch>
      </div>
    );
  }
}

function select(state) {
  return {
    location: state.getIn(['router', 'location'])
  }
}

export default connect(select)(RootContainer);
