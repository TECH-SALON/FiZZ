import {
  Map as IMap, List as IList
} from 'immutable';

import {
  MATCHES_GET_RESULTS_SUCCESS,
  MATCHES_GET_RESULTS_FAIL,
  MATCHES_GET_RESULT_SUCCESS,
  MATCHES_GET_RESULT_FAIL
} from '../actions/matchesAction';

const initialState = IMap({
  results: IList(),
  loaded: false,
  isLoading: true,
  error: IMap(),
});

const resultToMap = (r) => {
  let mappedResult = IMap({
    resultId: r.resultId,
    botName: r.botName,
    gameName: r.gameName,
    isWinner: r.isWinner,
    pointPercentage: r.pointPercentage,
    numOfWin: r.numOfWin,
    numOfLose: r.numOfLose,
    numOfDraw: r.numOfDraw,
    createdAt: r.createdAt,
  });
  return mappedResult;
};

const getResults = (state, results) => {
  let items = IList();
  results.Items.forEach((r, i) => {
    items = items.set(i, resultToMap(r))
  });
  return state
    .set('results', items)
    .set('loaded', true)
    .set('isLoading', false);
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
  case MATCHES_GET_RESULTS_SUCCESS:
    return getResults(state, action.results);
  default:
  MATCHES_GET_RESULTS_SUCCESS
    return state;
  }
}
