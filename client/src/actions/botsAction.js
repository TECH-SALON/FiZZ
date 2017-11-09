import api from '../api.js';
export const = 'GARAGE_REGISTER_BOT';
export const BOTS_REGISTER_BOT_REQUEST = 'GARAGE_REGISTER_BOT_REQUEST';
export const BOTS_REGISTER_BOT_SUCCESS = 'BOTS_REGISTER_BOT_SUCCESS';
export const GARAGE_REGISTER_BOT_FAIL = 'GARAGE_REGISTER_BOT_FAIL';

export function registerBot(bot){
  return (dispatch, getState) => {
    dispatch(registerBotRequest(bot))

    let params = FormDate()
    params.append('bot', bot)

    let url = '/api/....'
    api(getState).post(url, parmas).then( response => {
      registerBotSuccess(response.data);
    }).catch( error => {
      registerBotFail(error)
    });
  }
}

function registerBotRequest(bot){
  return {
    type: GARAGE_REGISTER_BOT_REQUEST,
    bot,
  }
}

function registerBotSuccess(bot){
  return {
    type: GARAGE_REGISTER_BOT_SUCCESS,
    bot,
  }
}

function registerBotFail(error){
  return {
    type: GARAGE_REGISTER_BOT_FAIL,
    error,
  }
}
