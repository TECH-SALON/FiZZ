import api, {endPoint, apiWithToken} from '../api';
import {mapGameIdToName} from '../utils';

export const GAMES_RUN_MATCH = 'GAMES_RUN_MATCH';
export const GAMES_RUN_MATCH_REQUEST = 'GAMES_RUN_MATCH_REQUEST';
export const GAMES_RUN_MATCH_SUCCESS = 'GAMES_RUN_MATCH_SUCCESS';
export const GAMES_RUN_MATCH_FAIL = 'GAMES_RUN_MATCH_FAIL';

export const GAMES_RUN_CODE_CHECK = 'GAMES_RUN_CODE_CHECK';
export const GAMES_RUN_CODE_CHECK_REQUEST = 'GAMES_RUN_CODE_CHECK_REQUEST';
export const GAMES_RUN_CODE_CHECK_SUCCESS = 'GAMES_RUN_CODE_CHECK_SUCCESS';
export const GAMES_RUN_CODE_CHECK_FAIL = 'GAMES_RUN_CODE_CHECK_FAIL';

export const GAMES_GET_RANKING = 'GAMES_GET_RANKING';
export const GAMES_GET_RANKING_REQUEST = 'GAMES_GET_RANKING_REQUEST';
export const GAMES_GET_RANKING_SUCCESS = 'GAMES_GET_RANKING_SUCCESS';
export const GAMES_GET_RANKING_FAIL = 'GAMES_GET_RANKING_FAIL';

// run match
export function runMatch(botId, gameName) {
  return(dispatch, getState) => {
    dispatch(runMatchRequest(botId));
    let params = new FormData();
    params.append("botId", botId);
    params.append("ruleId", "");
    params.append("range", "");
    let url = `${endPoint()}/api/v1/games/${gameName}/match`;
    api(getState).post(url, params).then( response => {
      dispatch(runMatchSuccess(response.data));
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

// run practice
export function runCodeCheck(bot) {
  return(dispatch, getState) => {
    dispatch(runCodeCheckRequest(bot));
    // let url = `${endPoint()}/games/reversi/codecheck`;
    // let url = 'http://localhost:3000/api/v1/games';
    console.log(bot);
    apiWithToken(getState).post('/games/reversi/codecheck', bot).then( response => {
      console.log(response)
      runCodeCheckSuccess(response.data);
    }).catch( error => {
      runCodeCheckFail(error);
    })
  }
}

function runCodeCheckRequest(bot){
  return {
    type: GAMES_RUN_CODE_CHECK_REQUEST,
    bot,
  }
}

function runCodeCheckSuccess(bot){
  return {
    type: GAMES_RUN_CODE_CHECK_SUCCESS,
    bot,
  }
}

function runCodeCheckFail(error){
  return {
    type: GAMES_RUN_CODE_CHECK_FAIL,
    error,
  }
}

export function getRanking(gameName) {
  return(dispatch, getState) => {
    dispatch(getRankingRequest(gameName));
    let url = `${endPoint()}/api/v1/games/${gameName}/ranking`;
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
