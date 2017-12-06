import Match from '../components/match'
import {connect} from 'react-redux';


import {
  scanBots,
} from '../actions/botsAction';

import {
  getRanking,
  runMatch
} from '../actions/gamesAction';

import {
  scanResults
} from '../actions/matchesAction';

const mapStateToProps = (state) => {
  return {
    bots: state.getIn(['bots', 'items']),
    ranking: state.getIn(['games', 'ranking']),
    results: state.getIn(['matches', 'results']),
    resultsLoading: state.getIn(['matches', 'isLoading'])
  }
}

const mapDispatchToProps = (dispatch) => ({
    onSetup: () => {
      dispatch(scanBots());
      dispatch(scanResults('reversi'));
      dispatch(getRanking('reversi'))
    },
    onMatchRun: (botId) => {
      dispatch(runMatch(botId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Match)
