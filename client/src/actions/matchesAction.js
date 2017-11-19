import api from '../api';

export const MATCHES_GET_HISTORY = 'MATCHES_GET_HISTORY';
export const MATCHES_GET_HISTORY_REQUEST = 'MATCHES_GET_HISTORY_REQUEST';
export const MATCHES_GET_HISTORY_SUCCESS = 'MATCHES_GET_HISTORY_SUCCESS';
export const MATCHES_GET_HISTORY_FAIL = 'MATCHES_GET_HISTORY_FAIL';

export const MATCHES_GET_RESULT = 'MATCHES_GET_RESULT';
export const MATCHES_GET_RESULT_REQUEST = 'MATCHES_GET_RESULT_REQUEST';
export const MATCHES_GET_RESULT_SUCCESS = 'MATCHES_GET_RESULT_SUCCESS';
export const MATCHES_GET_RESULT_FAIL = 'MATCHES_GET_RESULT_FAIL';

export const MATCHES_GET_FIGHTS_LOG = 'MATCHES_GET_FIGHTS_LOG';
export const MATCHES_GET_FIGHTS_LOG_REQUEST = 'MATCHES_GET_FIGHTS_LOG_REQUEST';
export const MATCHES_GET_FIGHTS_LOG_SUCCESS = 'MATCHES_GET_FIGHTS_LOG_SUCCESS';
export const MATCHES_GET_FIGHTS_LOG_FAIL = 'MATCHES_GET_FIGHTS_LOG_FAIL';


export function getHistory() {
  return(dispatch, getState) => {
    // dispatch(runMatchRequest(botId));
    let params = new FormData();
    params.append('botId', botId);
    let url = "/api/v1/games/reversi/match";
    api(getState).post(url, params).then( response => {
      getHistorySuccess(response.data);
    }).catch( error => {
      getHistoryFail(error);
    })
  }
}

function getHistoryRequest(){
  return {
    type: MATCHES_GET_HISTORY_REQUEST,
    bot,
  }
}

function getHistorySuccess(){
  return {
    type: MATCHES_GET_HISTORY_SUCCESS,
    bot,
  }
}

function getHistoryFail(error){
  return {
    type: MATCHES_GET_HISTORY_FAIL,
    error,
  }
}

export function getResult() {
  return(dispatch, getState) => {
    // dispatch(runMatchRequest(botId));
    let params = new FormData();
    // params.append('botId', botId);
    // let url = "/api/v1/games/reversi/match";
    // api(getState).post(url, params).then( response => {
    //   getResultSuccess(response.data);
    // }).catch( error => {
    //   getResultFail(error);
    // })
  }
}

function getResultRequest(){
  return {
    type: MATCHES_GET_RESULT_REQUEST,
    bot,
  }
}

function getResultSuccess(){
  return {
    type: MATCHES_GET_RESULT_SUCCESS,
    bot,
  }
}

function getResultFail(error){
  return {
    type: MATCHES_GET_RESULT_FAIL,
    error,
  }
}

export function getFightsLog(botId) {
  return(dispatch, getState) => {
    // dispatch(runMatchRequest(botId));
    let params = new FormData();
    params.append('botId', botId);
    let url = "/api/v1/games/reversi/match";
    api(getState).post(url, params).then( response => {
      getFightsLogSuccess(response.data);
    }).catch( error => {
      getFightsLogFail(error);
    })
  }
}

function getFightsLogRequest(bot){
  return {
    type: MATCHES_GET_FIGHTS_LOG_REQUEST,
    bot,
  }
}

function getFightsLogSuccess(bot){
  return {
    type: MATCHES_GET_FIGHTS_LOG_SUCCESS,
    bot,
  }
}

function getFightsLogFail(error){
  return {
    type: MATCHES_GET_FIGHTS_LOG_FAIL,
    error,
  }
}
