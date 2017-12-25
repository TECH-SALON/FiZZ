import React, {Component} from 'react';
import {render} from 'react-dom'

import {connect} from 'react-redux';
import {Route, Switch, Link, Redirect} from 'react-router-dom';

import NavBar from '../components/layouts/Navbar';
import TopPage from '../components/statics/TopPage';
import GarageContainer from './GarageContainer';
import MatchContainer from './MatchContainer';
import DocsContainer from './DocsContainer';


import {
  login,
  signup,
  logout,
  getCurrentUser,
} from '../actions/authAction';

class RootContainer extends Component {
  componentWillMount(){
    this.props.onSetup();
  }
  render() {
    const { logined } = this.props;
    if(logined) {
      return (
        <div>
          <NavBar onLogout={this.props.onLogout} tokens={this.props.tokens}/>
          <Switch>
              <Route path="/garage" component={GarageContainer}/>
              <Route path="/match" component={MatchContainer}/>
              <Route path="/docs" component={DocsContainer}/>
              <Route render={() => {
                return(
                  <Redirect to="/garage"/>
                );
              }}/>
          </Switch>
        </div>
      )
    } else {
      return (
        <div>
          <NavBar onLogin={this.props.onLogin} onSignup={this.props.onSignup}/>
          <Switch>
              <Route exact path="/" component={TopPage}/>
              <Route render={() => {
                return(
                  <Redirect to="/"/>
                );
              }}/>
          </Switch>
        </div>
      )
    }
  }
}

function select(state) {
  return {
    location: state.getIn(['router', 'location']),
    logined: state.getIn(['auth', 'logined']),
    tokens: state.getIn(['auth', 'tokens'])
  }
}

const mapDispatchToProps = (dispatch) => ({
    onSetup: () => {
      dispatch(getCurrentUser());
    },
    onLogin: (auth) => {
      dispatch(login(auth));
    },
    onSignup: (auth) => {
      dispatch(signup(auth));
    },
    onLogout: (tokens) => {
      dispatch(logout(tokens))
    }
});


export default connect(select, mapDispatchToProps)(RootContainer);
