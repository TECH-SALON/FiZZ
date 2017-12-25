import api, {endPoint} from '../api';

export const MATCHES_SCAN_RESULTS = 'MATCHES_SCAN_RESULTS';
export const MATCHES_SCAN_RESULTS_REQUEST = 'MATCHES_SCAN_RESULTS_REQUEST';
export const MATCHES_SCAN_RESULTS_SUCCESS = 'MATCHES_SCAN_RESULTS_SUCCESS';
export const MATCHES_SCAN_RESULTS_FAIL = 'MATCHES_SCAN_RESULTS_FAIL';

export const MATCHES_GET_RESULT = 'MATCHES_GET_RESULT';
export const MATCHES_GET_RESULT_REQUEST = 'MATCHES_GET_RESULT_REQUEST';
export const MATCHES_GET_RESULT_SUCCESS = 'MATCHES_GET_RESULT_SUCCESS';
export const MATCHES_GET_RESULT_FAIL = 'MATCHES_GET_RESULT_FAIL';

export const MATCHES_GET_FIGHTS_LOG = 'MATCHES_GET_FIGHTS_LOG';
export const MATCHES_GET_FIGHTS_LOG_REQUEST = 'MATCHES_GET_FIGHTS_LOG_REQUEST';
export const MATCHES_GET_FIGHTS_LOG_SUCCESS = 'MATCHES_GET_FIGHTS_LOG_SUCCESS';
export const MATCHES_GET_FIGHTS_LOG_FAIL = 'MATCHES_GET_FIGHTS_LOG_FAIL';


export function scanResults() {
  return(dispatch, getState) => {
    dispatch(scanResultsRequest());
    let url = `${endPoint()}/matches`;
    // let params = new FormData();
    // params.append('gameName', gameName);
    api(getState).get(url).then( response => {
      dispatch(scanResultsSuccess(response.data));
    }).catch( error => {
      scanResultsFail(error);
    })
  }
}

function scanResultsRequest(){
  return {
    type: MATCHES_SCAN_RESULTS_REQUEST,
  }
}

function scanResultsSuccess(results){
  return {
    type: MATCHES_SCAN_RESULTS_SUCCESS,
    results
  }
}

function scanResultsFail(error){
  return {
    type: MATCHES_SCAN_RESULTS_FAIL,
    error,
  }
}

export function getResult(resultId, gameName, botId) {
  return(dispatch, getState) => {
    dispatch(getResultRequest());
    let url = `${endPoint()}/api/v1/matches/${gameName}/${resultId}`;
    api(getState).get(url).then( response => {
      // console.log('here');
      dispatch(getResultSuccess(response.data, botId));
    }).catch( error => {
      getResultFail(error);
    })
  }
}

function getResultRequest(){
  return {
    type: MATCHES_GET_RESULT_REQUEST,
  }
}

function getResultSuccess(result, botId){
  return {
    type: MATCHES_GET_RESULT_SUCCESS,
    result,
    botId
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
    let url = `${endPoint()}/api/v1/games/reversi/match`;
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
