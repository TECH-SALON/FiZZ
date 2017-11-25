import {
  Map as IMap, List as IList
} from 'immutable';

// import {
//   matchSummaryToMap
// } from './matchReducer';

import {
  GAMES_RUN_MATCH_SUCCESS,
  GAMES_RUN_MATCH_FAIL,
  GAMES_GET_RANKING_SUCCESS,
  GAMES_GET_RANKING_FAIL
} from '../actions/gamesAction';

const initialState = IMap({
  items: IList(),
  ranking: IList(),
  loaded: false,
  isLoading: true,
  error: IMap(),
});

const runMatch = (state, bot) => {
  let items = IList();
  bots.forEach((b, i) => {
    items = items.set(i, botToMap(b))
  });
  return state
    .set('items', items)
    .set('loaded', true)
    .set('isLoading', false);
}

const getRanking = (state, ranking) => {
  return state
    .set('ranking', ranking)
    .set('loaded', true)
    .set('isLoading', false);
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
  case GAMES_RUN_MATCH_SUCCESS:
    return runMatch(state, action.bot);
  case GAMES_RUN_MATCH_FAIL:
  case GAMES_GET_RANKING_SUCCESS:
    return getRanking(state, action.ranking);
  case GAMES_GET_RANKING_FAIL:
  default:
    return state;
  }
}
