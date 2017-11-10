import React, {Component} from 'react';
import {render} from 'react-dom'

import {connect} from 'react-redux';
import {Route, Switch, Link} from 'react-router';

import NavBar from '../components/layouts/Navbar';
import TopPage from '../components/statics/TopPage';
import GarageContainer from './GarageContainer';


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
          <Route exact path="/garage" component={GarageContainer}/>
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
