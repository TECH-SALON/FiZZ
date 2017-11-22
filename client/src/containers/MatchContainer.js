import Match from '../components/match'
import {connect} from 'react-redux';


import {
  getBots,
} from '../actions/botsAction';

import {
  getRanking,
  runMatch
} from '../actions/gamesAction';

const mapStateToProps = (state) => {
  return {
    bots: state.getIn(['bots', 'items']),
    ranking: state.getIn(['games', 'ranking'])
  }
}

const mapDispatchToProps = (dispatch) => ({
    onSetup: () => {
      dispatch(getBots());
      dispatch(getRanking('reversi'))
    },
    onMatchRun: (botId) => {
      dispatch(runMatch(botId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Match)
