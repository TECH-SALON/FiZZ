import {
  Map as IMap, List as IList
} from 'immutable';

import {
  matchSummaryToMap
} from './matchReducer';

import {
  BOTS_REGISTER_BOT_SUCCESS,
  BOTS_REGISTER_BOT_FAIL,
} from '../actions/botsAction';

const initialState = IMap({
  author: IMap(),
  items: IList(),
  loaded: false,
  isLoading: true,
  error: IMap(),
});

const botToMap = (bot) => IMap({
  botName: bot.botName,
  isPrivate: bot.isPrivate,
  url: bot.url,
  matchSummaries: matchSummariesToList(bot.matchSummaries),
});

const matchSummariesToList = (summaries) => {
  let items = IList();
  summaries.forEach((s, i) => {
    items = items.set(i, matchSummaryToMap(s))
  });
  return items
}

const matchSummaryToMap = (match) => IMap({
  //....
});

const addBot = (state, bot) => {
  return state
    .update('items', list => list.concat(botToMap(bot)))
    .set('author', bot.author)
    .set('isLoading', false)
}

export function reduce(state = initialState, action) {
  switch (action.type) {
  case BOTS_REGISTER_BOT_SUCCESS:
    return addBot(state, action.bot);
  case BOTS_REGISTER_BOT_FAIL:
    return state.set('error', action.error);
  default:
    return state;
  }
}
