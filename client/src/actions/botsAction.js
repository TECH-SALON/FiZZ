import api, {endPoint} from '../api';
import {mapGameIdToName} from '../utils';

export const BOTS_CREATE_BOT = 'BOTS_CREATE_BOT';
export const BOTS_CREATE_BOT_REQUEST = 'BOTS_CREATE_BOT_REQUEST';
export const BOTS_CREATE_BOT_SUCCESS = 'BOTS_CREATE_BOT_SUCCESS';
export const BOTS_CREATE_BOT_FAIL = 'BOTS_CREATE_BOT_FAIL';

export const BOTS_SCAN_BOTS = 'BOTS_SCAN_BOTS';
export const BOTS_SCAN_BOTS_REQUEST = 'BOTS_SCAN_BOTS_REQUEST';
export const BOTS_SCAN_BOTS_SUCCESS = 'BOTS_SCAN_BOTS_SUCCESS';
export const BOTS_SCAN_BOTS_FAIL = 'BOTS_SCAN_BOTS_FAIL';

export const BOTS_GET_BOT = 'BOTS_GET_BOT';
export const BOTS_GET_BOT_REQUEST = 'BOTS_GET_BOT_REQUEST';
export const BOTS_GET_BOT_SUCCESS = 'BOTS_GET_BOT_SUCCESS';
export const BOTS_GET_BOT_FAIL = 'BOTS_GET_BOT_FAIL';

export const BOTS_STAND_BOT = 'BOTS_STAND_BOT';
export const BOTS_STAND_BOT_REQUEST = 'BOTS_STAND_BOT_REQUEST';
export const BOTS_STAND_BOT_SUCCESS = 'BOTS_STAND_BOT_SUCCESS';
export const BOTS_STAND_BOT_FAIL = 'BOTS_STAND_BOT_FAIL';

//create bot
export function createBot(bot){
  return (dispatch, getState) => {
    dispatch(createBotRequest(bot));

    let url = `/api/v1/bots/${bot.gameName}`;
    api(getState).post(url, {data: bot}).then( response => {
      createBotSuccess(response.data);
    }).catch( error => {
      createBotFail(error)
    });
  }
}

function createBotRequest(bot){
  return {
    type: BOTS_CREATE_BOT_REQUEST,
    bot,
  }
}

function createBotSuccess(bot){
  return {
    type: BOTS_CREATE_BOT_SUCCESS,
    bot,
  }
}

function createBotFail(error){
  return {
    type: BOTS_CREATE_BOT_FAIL,
    error,
  }
}

//get bots
export function scanBots(refresh = false){
  return (dispatch, getState) => {
    dispatch(scanBotsRequest());
    const bots = getState().get('bots');
    if(!refresh && bots.get('loaded')){
      return
    }
    let url = `/api/v1/bots`
    api(getState).get(url).then( response => {
      let bots = response.data;
      dispatch(scanBotsSuccess(bots));
    }).catch( error => {
      scanBotsFail(error)
    });
  }
}

function scanBotsRequest(){
  return {
    type: BOTS_SCAN_BOTS_REQUEST,
  }
}

function scanBotsSuccess(bots){
  return {
    type: BOTS_SCAN_BOTS_SUCCESS,
    bots,
  }
}

function scanBotsFail(error){
  return {
    type: BOTS_SCAN_BOTS_FAIL,
    error,
  }
}

//get bot
export function getBot(id){
  return (dispatch, getState) => {
    dispatch(getBotRequest(id))

    let url = `/api/v1/bots/${id}`
    api(getState).get(url).then( response => {
      getBotSuccess(response.data);
    }).catch( error => {
      getBotFail(error)
    });
  }
}

function getBotRequest(id){
  return {
    type: BOTS_GET_BOT_REQUEST,
    id,
  }
}

function getBotSuccess(bot){
  return {
    type: BOTS_GET_BOT_SUCCESS,
    bot,
  }
}

function getBotFail(error){
  return {
    type: BOTS_GET_BOT_FAIL,
    error,
  }
}

//stand bot
export function standBot(id){
  return (dispatch, getState) => {
    dispatch(standBotRequest(id))

    let bot = getState().getIn('bots', 'items').find(bot => bot.get('id') == id)
    if (!bot.get('qualified')){
      return
    }

    let url = `/api/v1/bots/${id}`
    api(getState).get(url).then( response => {
      standBotSuccess(response.data);
    }).catch( error => {
      standBotFail(error)
    });
  }
}

function standBotRequest(id){
  return {
    type: BOTS_STAND_BOT_REQUEST,
    id,
  }
}

function standBotSuccess(bot){
  return {
    type: BOTS_STAND_BOT_SUCCESS,
    bot,
  }
}

function standBotFail(error){
  return {
    type: BOTS_STAND_BOT_FAIL,
    error,
  }
}
