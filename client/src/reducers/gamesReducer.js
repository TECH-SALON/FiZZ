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

const botToMap = (bot) => IMap({
  id: bot.id,
  botName: bot.botName,
  authorId: bot.authorId,
  gameId: bot.gameId,
  isPrivate: bot.isPrivate,
  qualified: bot.qualified,
  standBy: bot.standBy,
  repoUrl: bot.repoUrl,
  matchSummaries: matchSummariesToList(bot.matchSummaries),
});

const matchSummariesToList = (summaries) => {
  let items = IList();
  summaries.forEach((s, i) => {
    items = items.set(i, matchSummaryToMap(s))
  });
  return items
}

const matchSummaryToMap = (summary) => IMap({
  id: summary.id,
  result: summary.result
});

const getBots = (state, bots) => {
  let items = IList();
  bots.forEach((b, i) => {
    items = items.set(i, botToMap(b))
  });

  return state
    .set('items', items)
    .set('loaded', true)
    .set('isLoading', false);
}

const addBot = (state, bot) => {
  return state
    .update('items', list => list.concat(botToMap(bot)))
    .set('isLoading', false)
}

const updateBot = (state, bot) => {
  return state
    .update('items', list => {
      list.find(b => b.get('id') == bot.get('id')).withMutations(map => {
        map.set('botName', bot.botName)
        map.set('isPrivate', bot.isPrivate)
        map.set('qualified', bot.qualified)
        map.set('standBy', bot.standBy)
        map.set('repoUrl', bot.repoUrl)
        map.set('matchSummaries', matchSummariesToList(bot.matchSummaries))
      })
    })
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
