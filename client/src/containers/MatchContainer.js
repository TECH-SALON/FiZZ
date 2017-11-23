import Match from '../components/match'
import {connect} from 'react-redux';


import {
  getBots,
} from '../actions/botsAction';

import {
  getRanking,
  runMatch
} from '../actions/gamesAction';

import {
  getResults
} from '../actions/matchesAction';

const mapStateToProps = (state) => {
  return {
    bots: state.getIn(['bots', 'items']),
    ranking: state.getIn(['games', 'ranking']),
    results: state.getIn(['matches', 'results'])
  }
}

const mapDispatchToProps = (dispatch) => ({
    onSetup: () => {
      dispatch(getBots());
      dispatch(getResults('reversi'));
      dispatch(getRanking('reversi'))
    },
    onMatchRun: (botId) => {
      dispatch(runMatch(botId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Match)
