import {
  Map as IMap, List as IList
} from 'immutable';

// import {
//   matchSummaryToMap
// } from './matchReducer';

import {
  BOTS_CREATE_BOT_REQUEST,
  BOTS_CREATE_BOT_SUCCESS,
  BOTS_SCAN_BOTS_SUCCESS,
  BOTS_SCAN_BOTS_REQUEST,
  BOTS_STAND_BOT_SUCCESS,
  BOTS_GET_BOT_SUCCESS,
  BOTS_CREATE_BOT_FAIL,
  BOTS_SCAN_BOTS_FAIL,
  BOTS_GET_BOT_FAIL,
  BOTS_STAND_BOT_FAIL,
} from '../actions/botsAction';

export const initialState = IMap({
  items: IList(),
  loaded: false,
  isLoading: true,
  createCompleted: false,
  error: IMap(),
});

const botToMap = (bot) => {
  var result = bot.botCode.split(':');
  var username = result[0];
  var name = result[1];
  let mappedBot = IMap({
    botCode: bot.botCode,
    username: username,
    name: name,
    gameName: bot.gameName,
    isPrivate: bot.isPrivate,
    isQualified: bot.isQualified,
    isStandBy: bot.isStandBy,
    isValid: bot.isValid,
    isMatching: bot.isMatching,
    description: bot.description,
    rank: bot.rank,
    resourceUrl: bot.resourceUrl,
    runtime: bot.runtime,
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

const scanBots = (state, bots) => {
  let items = IList();
  bots.Items.forEach((b, i) => {
    items = items.set(i, botToMap(b))
  });
  return state
    .set('items', items)
    .set('loaded', true)
    .set('isLoading', false);
}

const addBot = (state, bot) => {
  return state
    .set('createCompleted', true)
}

const createBotRequest = (state) => {
  return state
    .set('createCompleted', false)
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
  case BOTS_CREATE_BOT_REQUEST:
    return createBotRequest(state);
  case BOTS_CREATE_BOT_SUCCESS:
    return addBot(state, action.bot);
  case BOTS_STAND_BOT_SUCCESS:
    return updateBot(state, action.bot);
  case BOTS_SCAN_BOTS_SUCCESS:
    return scanBots(state, action.bots);
  case BOTS_CREATE_BOT_FAIL:
  case BOTS_SCAN_BOTS_FAIL:
  case BOTS_STAND_BOT_FAIL:
  case BOTS_GET_BOT_FAIL:
    return state.set('error', action.error);
  default:
    return state;
  }
}
