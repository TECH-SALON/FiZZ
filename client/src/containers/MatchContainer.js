import Match from '../components/match'
import {connect} from 'react-redux';
import {
  Map as IMap, List as IList
} from 'immutable';

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
  const bots = state.getIn(['bots', 'items']);
  const results = state.getIn(['matches', 'results']);
  let reversiBots = IList();
  let reversiResults = IList();
  bots.forEach(item => {
    switch (item.get("gameName")) {
      case "reversi":
        reversiBots = reversiBots.push(item);
      default:
        return
    }
  });
  results.forEach(item => {
    switch (item.get("gameName")) {
      case "reversi":
        reversiResults = reversiResults.push(item);
      default:
        return
    }
  });
  return {
    reversiBots: reversiBots,
    ranking: state.getIn(['games', 'ranking']),
    reversiResults: reversiResults,
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
