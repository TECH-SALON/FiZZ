import {
  Map as IMap, List as IList
} from 'immutable';

import {
  MATCHES_GET_RESULTS_SUCCESS,
  MATCHES_GET_RESULTS_FAIL,
  MATCHES_GET_RESULT_SUCCESS,
  MATCHES_GET_RESULT_FAIL
} from '../actions/gamesAction';

const initialState = IMap({
  results: IList(),
  loaded: false,
  isLoading: true,
  error: IMap(),
});

const getResults = (state, results) => {
  return state
    .set('results', results)
    .set('loaded', true)
    .set('isLoading', false);
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
  case MATCHES_GET_RESULTS_SUCCESS:
    return getResults(state, action.results);
  default:
    return state;
  }
}
