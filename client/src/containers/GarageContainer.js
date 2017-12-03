import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Garage from '../components/garage'
import {connect} from 'react-redux';

import {
  getBots,
  createBot,
  standBot,
} from '../actions/botsAction';

import {
  runPractice
} from '../actions/gamesAction';

import {
  getResults
} from '../actions/matchesAction';

const mapStateToProps = (state) => {
  return {
    bots: state.getIn(['bots', 'items']),
    results: state.getIn(['matches', 'results'])
  }
}

const mapDispatchToProps = (dispatch) => ({
    onSetup: () => {
      dispatch(getBots());
      dispatch(getResults());
    },
    onCreateBot: (bot) => {
      dispatch(createBot(bot))
    },
    onPracticeBot: (botId) => {
      dispatch(runPractice(botId))
    },
    onStandBot: (botId) => {
      dispatch(standBot(botId))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Garage)
