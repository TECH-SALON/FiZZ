import api, {endPoint} from '../api';
import {mapGameIdToName} from '../utils';

export const BOTS_REGISTER_BOT = 'BOTS_REGISTER_BOT';
export const BOTS_REGISTER_BOT_REQUEST = 'BOTS_REGISTER_BOT_REQUEST';
export const BOTS_REGISTER_BOT_SUCCESS = 'BOTS_REGISTER_BOT_SUCCESS';
export const BOTS_REGISTER_BOT_FAIL = 'BOTS_REGISTER_BOT_FAIL';

export const BOTS_GET_BOTS = 'BOTS_GET_BOTS';
export const BOTS_GET_BOTS_REQUEST = 'BOTS_GET_BOTS_REQUEST';
export const BOTS_GET_BOTS_SUCCESS = 'BOTS_GET_BOTS_SUCCESS';
export const BOTS_GET_BOTS_FAIL = 'BOTS_GET_BOTS_FAIL';

export const BOTS_GET_BOT = 'BOTS_GET_BOT';
export const BOTS_GET_BOT_REQUEST = 'BOTS_GET_BOT_REQUEST';
export const BOTS_GET_BOT_SUCCESS = 'BOTS_GET_BOT_SUCCESS';
export const BOTS_GET_BOT_FAIL = 'BOTS_GET_BOT_FAIL';

export const BOTS_STAND_BOT = 'BOTS_STAND_BOT';
export const BOTS_STAND_BOT_REQUEST = 'BOTS_STAND_BOT_REQUEST';
export const BOTS_STAND_BOT_SUCCESS = 'BOTS_STAND_BOT_SUCCESS';
export const BOTS_STAND_BOT_FAIL = 'BOTS_STAND_BOT_FAIL';

//register bot
export function registerBot(bot){
  return (dispatch, getState) => {
    dispatch(registerBotRequest(bot));
    let params = new FormData();
    params.append('bot', bot);
    let url = `/api/v1/bots/${mapGameIdToName(bot.gameId)}`
    api(getState).post(url, params).then( response => {
      registerBotSuccess(response.data);
    }).catch( error => {
      registerBotFail(error)
    });
  }
}

function registerBotRequest(bot){
  return {
    type: BOTS_REGISTER_BOT_REQUEST,
    bot,
  }
}

function registerBotSuccess(bot){
  return {
    type: BOTS_REGISTER_BOT_SUCCESS,
    bot,
  }
}

function registerBotFail(error){
  return {
    type: BOTS_REGISTER_BOT_FAIL,
    error,
  }
}

//get bots
export function getBots(refresh = false){
  return (dispatch, getState) => {
    dispatch(getBotsRequest());

    const bots = getState().get('bots');

    if(!refresh && bots.get('loaded')){
      return
    }

    let url = `${endPoint()}/api/v1/bots`

    api(getState).get(url).then( response => {
      getBotsSuccess(response.data);
    }).catch( error => {
      getBotsFail(error)
    });
  }
}

function getBotsRequest(){
  return {
    type: BOTS_GET_BOTS_REQUEST,
  }
}

function getBotsSuccess(bots){
  return {
    type: BOTS_GET_BOTS_SUCCESS,
    bots,
  }
}

function getBotsFail(error){
  return {
    type: BOTS_GET_BOTS_FAIL,
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
