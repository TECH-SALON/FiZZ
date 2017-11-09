import React, {Component} from 'react';
import {render} from 'react-dom'

import {connect} from 'react-redux';
import {Route, Switch, Link} from 'react-router';
import TopPage from '../pages/TopPage';

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
