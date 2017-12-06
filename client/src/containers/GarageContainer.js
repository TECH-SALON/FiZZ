import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Garage from '../components/garage'
import {connect} from 'react-redux';

import {
  scanBots,
  createBot,
  standBot,
} from '../actions/botsAction';

import {
  runPractice
} from '../actions/gamesAction';

import {
  scanResults,
  getResult
} from '../actions/matchesAction';

const mapStateToProps = (state) => {
  return {
    bots: state.getIn(['bots', 'items']),
    botsLoading: state.getIn(['bots', 'isLoading']),
    results: state.getIn(['matches', 'results']),
    resultsLoading: state.getIn(['matches', 'isLoading'])
  }
}

const mapDispatchToProps = (dispatch) => ({
    onSetup: () => {
      dispatch(scanBots());
      dispatch(scanResults());
    },
    onCreateBot: (bot) => {
      dispatch(createBot(bot))
    },
    onPracticeBot: (botId) => {
      dispatch(runPractice(botId))
    },
    onStandBot: (botId) => {
      dispatch(standBot(botId))
    },
    onGetResult: (resultId, gameName) => {
      dispatch(getResult(resultId, gameName))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Garage)
