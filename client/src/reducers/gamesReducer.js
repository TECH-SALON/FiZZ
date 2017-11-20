import {
  Map as IMap, List as IList
} from 'immutable';

// import {
//   matchSummaryToMap
// } from './matchReducer';

import {
  GAMES_RUN_MATCH_SUCCESS,
  GAMES_RUN_MATCH_FAIL,
} from '../actions/gamesAction';

const initialState = IMap({
  items: IList(),
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

export default function reduce(state = initialState, action) {
  switch (action.type) {
  case GAMES_RUN_MATCH_SUCCESS:
    return runMatch(state, action.bot);
  case GAMES_RUN_MATCH_FAIL:
  default:
    return state;
  }
}
