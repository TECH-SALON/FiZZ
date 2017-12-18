import {
  Map as IMap, List as IList
} from 'immutable';

import {
  MATCHES_SCAN_RESULTS_SUCCESS,
  MATCHES_SCAN_RESULTS_FAIL,
  MATCHES_GET_RESULT_SUCCESS,
  MATCHES_GET_RESULT_FAIL
} from '../actions/matchesAction';

const initialState = IMap({
  results: IList(),
  participants: IList(),
  loaded: false,
  isLoading: true,
  error: IMap(),
});

const resultToMap = (r) => {
  let mappedResult = IMap({
    id: r.id,
    resultId: r.resultId,
    botId: r.botId,
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

const botToMap = (b) => {
  let mappedBot = IMap({
    id: b.id,
    name: b.name,
    imageUrl: b.imageUrl,
    username: b.username,
    description: b.description
  });
  return mappedBot;
}

const scanResults = (state, results) => {
  let items = IList();
  results.Items.forEach((r, i) => {
    items = items.set(i, resultToMap(r))
  });
  return state
    .set('results', items)
    .set('loaded', true)
    .set('isLoading', false);
}

const getResult = (state, result, botId) => {
  let items = IList();
  result.Item.bots.forEach((b, i) => {
    if(b.id != botId) {
      items = items.push(botToMap(b))
    } else {
      return
    }
  });
  return state
    .set('participants', items)
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
  case MATCHES_SCAN_RESULTS_SUCCESS:
    return scanResults(state, action.results);
  case MATCHES_GET_RESULT_SUCCESS:
    return getResult(state, action.result, action.botId);
  default:
    return state;
  }
}
