import api from '../api';

export const MATCHES_GET_RESULTS = 'MATCHES_GET_RESULTS';
export const MATCHES_GET_RESULTS_REQUEST = 'MATCHES_GET_RESULTS_REQUEST';
export const MATCHES_GET_RESULTS_SUCCESS = 'MATCHES_GET_RESULTS_SUCCESS';
export const MATCHES_GET_RESULTS_FAIL = 'MATCHES_GET_RESULTS_FAIL';

export const MATCHES_GET_RESULT = 'MATCHES_GET_RESULT';
export const MATCHES_GET_RESULT_REQUEST = 'MATCHES_GET_RESULT_REQUEST';
export const MATCHES_GET_RESULT_SUCCESS = 'MATCHES_GET_RESULT_SUCCESS';
export const MATCHES_GET_RESULT_FAIL = 'MATCHES_GET_RESULT_FAIL';

export const MATCHES_GET_FIGHTS_LOG = 'MATCHES_GET_FIGHTS_LOG';
export const MATCHES_GET_FIGHTS_LOG_REQUEST = 'MATCHES_GET_FIGHTS_LOG_REQUEST';
export const MATCHES_GET_FIGHTS_LOG_SUCCESS = 'MATCHES_GET_FIGHTS_LOG_SUCCESS';
export const MATCHES_GET_FIGHTS_LOG_FAIL = 'MATCHES_GET_FIGHTS_LOG_FAIL';


export function getResults(gameName) {
  return(dispatch, getState) => {
    dispatch(getResultsRequest(gameName));
    let url = "/api/v1/matches";
    let params = new FormData();
    params.append('gameName', gameName);
    api(getState).get(url, params).then( response => {
      getResultsSuccess(response.data);
    }).catch( error => {
      getResultsFail(error);
    })
  }
}

function getResultsRequest(){
  return {
    type: MATCHES_GET_RESULTS_REQUEST,
  }
}

function getResultsSuccess(results){
  return {
    type: MATCHES_GET_RESULTS_SUCCESS,
    results
  }
}

function getResultsFail(error){
  return {
    type: MATCHES_GET_RESULTS_FAIL,
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
