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
  signup
} from '../actions/authAction';

class RootContainer extends Component {
  componentWillMount() {
    console.log(this.props);
  }
  render() {
    return(
      <div>
        <NavBar onLogin={this.props.onLogin} onSignup={this.props.onSignup}/>
        <Switch>
            <Route exact path="/" component={TopPage}/>
            <Route path="/garage" component={GarageContainer}/>
            <Route path="/match" component={MatchContainer}/>
            <Route path="/docs" component={DocsContainer}/>
        </Switch>
      </div>
    )
  }
  // render() {
  //   const { logined } = this.props;
  //   if(logined) {
  //     return (
  //       <div>
  //         <NavBar onLogin={this.props.onLogin} onSignup={this.props.onSignup}/>
  //         <Switch>
  //             <Route path="/garage" component={GarageContainer}/>
  //             <Route path="/match" component={MatchContainer}/>
  //             <Route path="/docs" component={DocsContainer}/>
  //             <Route render={() => {
  //               return(
  //                 <Redirect to="/garage"/>
  //               );
  //             }}/>
  //         </Switch>
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div>
  //         <NavBar onLogin={this.props.onLogin} onSignup={this.props.onSignup}/>
  //         <Switch>
  //             <Route exact path="/" component={TopPage}/>
  //             <Route render={() => {
  //               return(
  //                 <Redirect to="/"/>
  //               );
  //             }}/>
  //         </Switch>
  //       </div>
  //     )
  //   }
  // }
}

function select(state) {
  return {
    location: state.getIn(['router', 'location']),
    logined: state.getIn(['auth', 'logined'])
  }
}

const mapDispatchToProps = (dispatch) => ({
    onLogin: (auth) => {
      dispatch(login(auth))
    },
    onSignup: (auth) => {
      dispatch(signup(auth))
    },
    onLogout: () => {
      console.log("loout now")
    }
});


export default connect(select, mapDispatchToProps)(RootContainer);
