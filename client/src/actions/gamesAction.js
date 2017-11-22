import api from '../api';
import {mapGameIdToName} from '../utils';

export const GAMES_RUN_MATCH = 'GAMES_RUN_MATCH';
export const GAMES_RUN_MATCH_REQUEST = 'GAMES_RUN_MATCH_REQUEST';
export const GAMES_RUN_MATCH_SUCCESS = 'GAMES_RUN_MATCH_SUCCESS';
export const GAMES_RUN_MATCH_FAIL = 'GAMES_RUN_MATCH_FAIL';

export const GAMES_GET_RANKING = 'GAMES_GET_RANKING';
export const GAMES_GET_RANKING_REQUEST = 'GAMES_GET_RANKING_REQUEST';
export const GAMES_GET_RANKING_SUCCESS = 'GAMES_GET_RANKING_SUCCESS';
export const GAMES_GET_RANKING_FAIL = 'GAMES_GET_RANKING_FAIL';

// run match
export function runMatch(botId) {
  return(dispatch, getState) => {
    dispatch(runMatchRequest(botId));
    let params = new FormData();
    params.append("botId", botId);
    params.append("ruleId", "");
    params.append("range", "");
    let url = "/api/v1/games/reversi/match";
    api(getState).post(url, params).then( response => {
      runMatchSuccess(response.data);
    }).catch( error => {
      runMatchFail(error);
    })
  }
}

function runMatchRequest(bot){
  return {
    type: GAMES_RUN_MATCH_REQUEST,
    bot,
  }
}

function runMatchSuccess(bot){
  return {
    type: GAMES_RUN_MATCH_SUCCESS,
    bot,
  }
}

function runMatchFail(error){
  return {
    type: GAMES_RUN_MATCH_FAIL,
    error,
  }
}

export function getRanking(gameName) {
  return(dispatch, getState) => {
    dispatch(getRankingRequest(gameName));
    let url = `/api/v1/games/${gameName}/ranking`;
    api(getState).get(url).then( response => {
      getRankingSuccess(response.data);
    }).catch( error => {
      getRankingFail(error);
    })
  }
}

function getRankingRequest(bot){
  return {
    type: GAMES_GET_RANKING_REQUEST,
    bot,
  }
}

function getRankingSuccess(bot){
  return {
    type: GAMES_GET_RANKING_SUCCESS,
    bot,
  }
}

function getRankingFail(error){
  return {
    type: GAMES_GET_RANKING_FAIL,
    error,
  }
}
