import Match from '../components/match'
import {connect} from 'react-redux';


import {
  getBots,
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
    onMatchRun: (id) => {
      dispatch()
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Match)
