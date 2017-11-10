import Match from '../components/match'
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    bots: state.getIn(['bots', 'items']),
  }
}

const mapDispatchToProps = (dispatch) => ({
    onSetup: () => {
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Match)
