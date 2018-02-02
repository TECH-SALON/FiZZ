import api, {apiWithToken} from '../api';
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

export const BOTS_EDIT_BOT = 'BOTS_EDIT_BOT';
export const BOTS_EDIT_BOT_REQUEST = 'BOTS_EDIT_BOT_REQUEST';
export const BOTS_EDIT_BOT_SUCCESS = 'BOTS_EDIT_BOT_SUCCESS';
export const BOTS_EDIT_BOT_FAIL = 'BOTS_EDIT_BOT_FAIL';

export const BOTS_DELETE_BOT = 'BOTS_DELETE_BOT';
export const BOTS_DELETE_BOT_REQUEST = 'BOTS_DELETE_BOT_REQUEST';
export const BOTS_DELETE_BOT_SUCCESS = 'BOTS_DELETE_BOT_SUCCESS';
export const BOTS_DELETE_BOT_FAIL = 'BOTS_DELETE_BOT_FAIL';

//create bot
export function createBot(bot){
  return (dispatch, getState) => {
    const userId = getState().getIn(['auth', 'userId']);
    bot.userId = userId;
    console.log(bot);
    dispatch(createBotRequest(bot));
    apiWithToken(getState).post('/bots', bot).then( response => {
      dispatch(createBotSuccess(response.data));
      dispatch(scanBots(true));
    }).catch( error => {
      console.log(error)
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
    apiWithToken(getState).get('/bots').then( response => {
      console.log(response);
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

    let url = `${endPoint()}/bots/${id}`
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


//Edit bot

export function editBot(bot){
  return (dispatch, getState) => {
    dispatch(editBotRequest(bot));
    console.log(bot);
    let url = `${endPoint()}/api/v1/bots/${bot.id}`;
    let params = new FormData();
    params.append("bot", bot);

    api(getState).put(url, bot).then( response => {
      editBotSuccess(response.data);
    }).catch( error => {
      editBotFail(error)
    });
  }
}

function editBotRequest(){
  return {
    type: BOTS_EDIT_BOT_REQUEST,
  }
}

function editBotSuccess(bot){
  return {
    type: BOTS_EDIT_BOT_SUCCESS,
    bot,
  }
}

function editBotFail(error){
  return {
    type: BOTS_EDIT_BOT_FAIL,
    error,
  }
}


//delete bot
export function deleteBot(botId){
  return (dispatch, getState) => {
    console.log(botId);
    const params = {
      'botId': botId
    };
    apiWithToken(getState).delete('/bots',{'params': params}).then( response => {
      console.log(response);
      dispatch(scanBots(true));
    }).catch( error => {
      console.log(error)
      deleteBotFail(error)
    });
  }
}

function deleteBotFail(error){
  return {
    type: BOTS_DLETE_BOT_FAIL,
    error,
  }
}
