import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Garage from '../components/garage'
import {connect} from 'react-redux';

import {
  getBots,
  registerBot,
  standBot,
} from '../actions/botsAction';

const mapStateToProps = (state) => {
  return {
    author: state.getIn(['bots', 'author']),
    bots: state.getIn(['bots', 'items']),
    matchSummaries: state.getIn(['bots', 'matchSummaries'])
  }
}

const mapDispatchToProps = (dispatch) => ({
    onSetup: () => {
      dispatch()
    },
    onRegisterBot: (bot) => {
      dispatch(registerBot(bot))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Garage)
