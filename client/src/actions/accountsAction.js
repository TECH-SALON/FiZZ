import api from '../api';

export const ACCOUNTS_GET_CREDENTIALS = 'ACCOUNTS_GET_CREDENTIALS';
export const ACCOUNTS_GET_CREDENTIALS_REQUEST = 'ACCOUNTS_GET_CREDENTIALS_REQUEST';
export const ACCOUNTS_GET_CREDENTIALS_SUCCESS = 'ACCOUNTS_GET_CREDENTIALS_SUCCESS';
export const ACCOUNTS_GET_CREDENTIALS_FAIL = 'ACCOUNTS_GET_CREDENTIALS_FAIL';

export const ACCOUNTS_GET_ACCOUNT = 'ACCOUNTS_GET_ACCOUNT';
export const ACCOUNTS_GET_ACCOUNT_REQUEST = 'ACCOUNTS_GET_ACCOUNT_REQUEST';
export const ACCOUNTS_GET_ACCOUNT_SUCCESS = 'ACCOUNTS_GET_ACCOUNT_SUCCESS';
export const ACCOUNTS_GET_ACCOUNT_FAIL = 'ACCOUNTS_GET_ACCOUNT_FAIL';

export const ACCOUNTS_GET_ACCOUNT_BOTS = 'ACCOUNTS_GET_ACCOUNT_BOTS';
export const ACCOUNTS_GET_ACCOUNT_BOTS_REQUEST = 'ACCOUNTS_GET_ACCOUNT_BOTS_REQUEST';
export const ACCOUNTS_GET_ACCOUNT_BOTS_SUCCESS = 'ACCOUNTS_GET_ACCOUNT_BOTS_SUCCESS';
export const ACCOUNTS_GET_ACCOUNT_BOTS_FAIL = 'ACCOUNTS_GET_ACCOUNT_BOTS_FAIL';

export function getCredentials() {
  return(dispatch, getState) => {
    dispatch(getCredentialsRequest());
    let params = new FormData();
    // params.append('botId', botId);
    // let url = "/api/v1/games/reversi/match";
    // api(getState).post(url, params).then( response => {
    //   getCredentialsSuccess(response.data);
    // }).catch( error => {
    //   getCredentialsFail(error);
    // })
  }
}

function getCredentialsRequest(){
  return {
    type: ACCOUNTS_GET_CREDENTIALS_REQUEST,
    bot,
  }
}

function getCredentialsSuccess(){
  return {
    type: ACCOUNTS_GET_CREDENTIALS_SUCCESS,
    bot,
  }
}

function getCredentialsFail(error){
  return {
    type: ACCOUNTS_GET_CREDENTIALS_FAIL,
    error,
  }
}

export function getAccount() {
  return(dispatch, getState) => {
    dispatch(getAccountRequest());
    let params = new FormData();
    // params.append('botId', botId);
    // let url = "/api/v1/games/reversi/match";
    // api(getState).post(url, params).then( response => {
    //   getAccountSuccess(response.data);
    // }).catch( error => {
    //   getAccountFail(error);
    // })
  }
}

function getAccountRequest(){
  return {
    type: ACCOUNTS_GET_ACCOUNT_REQUEST,
    bot,
  }
}

function getAccountSuccess(){
  return {
    type: ACCOUNTS_GET_ACCOUNT_SUCCESS,
    bot,
  }
}

function getAccountFail(error){
  return {
    type: ACCOUNTS_GET_ACCOUNT_FAIL,
    error,
  }
}

export function getAccountBots() {
  return(dispatch, getState) => {
    dispatch(getAccountBotsRequest());
    let params = new FormData();
    // params.append('botId', botId);
    // let url = "/api/v1/games/reversi/match";
    // api(getState).post(url, params).then( response => {
    //   getAccountBotsSuccess(response.data);
    // }).catch( error => {
    //   getAccountBotsFail(error);
    // })
  }
}

function getAccountBotsRequest(){
  return {
    type: ACCOUNTS_GET_ACCOUNT_BOTS_REQUEST,
    bot,
  }
}

function getAccountBotsSuccess(){
  return {
    type: ACCOUNTS_GET_ACCOUNT_BOTS_SUCCESS,
    bot,
  }
}

function getAccountBotsFail(error){
  return {
    type: ACCOUNTS_GET_ACCOUNT_BOTS_FAIL,
    error,
  }
}
