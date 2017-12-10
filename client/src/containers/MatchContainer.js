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
  let reversiBots = IList();
  bots.forEach( item => {
    switch (item.get("gameName")) {
      case "reversi":
        reversiBots = reversiBots.push(item);
      default:
        return
    }
  });
  return {
    reversiBots: reversiBots,
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
