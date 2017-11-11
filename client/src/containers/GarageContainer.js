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
    bots: state.getIn(['bots', 'items']),
  }
}

const mapDispatchToProps = (dispatch) => ({
    onSetup: () => {
      dispatch(getBots());
    },
    onRegisterBot: (bot) => {
      dispatch(registerBot(bot))
    },
    onStandBot: (id) => {
      dispatch(standBot(id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Garage)
