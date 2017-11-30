import {
  Map as IMap, List as IList
} from 'immutable';

// import {
//   matchSummaryToMap
// } from './matchReducer';

import {
  BOTS_REGISTER_BOT_SUCCESS,
  BOTS_GET_BOTS_SUCCESS,
  BOTS_STAND_BOT_SUCCESS,
  BOTS_GET_BOT_SUCCESS,
  BOTS_REGISTER_BOT_FAIL,
  BOTS_GET_BOTS_FAIL,
  BOTS_GET_BOT_FAIL,
  BOTS_STAND_BOT_FAIL,
} from '../actions/botsAction';

export const initialState = IMap({
  items: IList(),
  loaded: false,
  isLoading: true,
  error: IMap(),
});

const botToMap = (bot) => {
  let mappedBot = IMap({
    id: bot.id,
    accountId: bot.accountId,
    gameId: bot.gameId,
    name: bot.name,
    isPrivate: bot.isPrivate,
    isQualified: bot.isQualified,
    isStandBy: bot.isStandBy,
    isValid: bot.isValid,
    isMatching: bot.isMatching,
    rank: bot.rank,
    repoUrl: bot.repoUrl,
    updatedAt: bot.updatedAt,
    createdAt: bot.createdAt
    // matchSummaries: matchSummariesToList(bot.matchSummaries),
  });
  return mappedBot;
};

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
  bots.Items.forEach((b, i) => {
    items = items.set(i, botToMap(b))
  });

  // console.log(bots.Items[0].isValid);
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
  case BOTS_REGISTER_BOT_SUCCESS:
    return addBot(state, action.bot);
  case BOTS_STAND_BOT_SUCCESS:
    return updateBot(state, action.bot);
  case BOTS_GET_BOTS_SUCCESS:
    return getBots(state, action.bots);
  case BOTS_REGISTER_BOT_FAIL:
  case BOTS_GET_BOTS_FAIL:
  case BOTS_STAND_BOT_FAIL:
  case BOTS_GET_BOT_FAIL:
    return state.set('error', action.error);
  default:
    return state;
  }
}
