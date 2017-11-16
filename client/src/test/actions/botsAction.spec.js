import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/botAction'
import expect from 'expect'
import mockAdapter from 'axios-mock-adapter';

import api from '../../api';
import endPoint from '../../utils';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const axiosMock = new mockAdapter(api);

describe('Async actions', () => {
  //getBots
  it('creates BOTS_GET_BOTS_SUCCESS when getBots has been done', () => {
    axiosMock
      .onGet(`${endPoint()}/api/v1/bots`).reply(200, {})

    const expectedActions = [
      { type: actions.BOTS_GET_BOTS_REQUEST},
      { type: actions.BOTS_GET_BOTS_SUCCESS, bots: {} }
    ]
    const store = mockStore({ bots: [] })

    return store.dispatch(actions.getBots()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  //getBot
  it('creates BOTS_GET_BOT_SUCCESS when getBot has been done', () => {
    const id = 1
    axiosMock
      .onGet(`${endPoint()}/api/v1/bots/${id}`).reply(200, {})

    const expectedActions = [
      { type: actions.BOTS_GET_BOT_REQUEST},
      { type: actions.BOTS_GET_BOT_SUCCESS, bot: {} }
    ]
    const store = mockStore({ bots: [] })

    return store.dispatch(actions.getBot(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  //registerBot
  it('creates BOTS_REGISTER_BOT_SUCCESS when registerBot has been done', () => {
    const gameName = 'reversi';
    const bot = {};
    axiosMock
      .onPost(`${endPoint()}/api/v1/bots/${gameName}`).reply(201, {})

    const expectedActions = [
      { type: actions.BOTS_REGISTER_BOT_REQUEST},
      { type: actions.BOTS_REGISTER_BOT_SUCCESS, bot: {} }
    ]
    const store = mockStore({ bots: [] })

    return store.dispatch(actions.registerBots(bot)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  //standBot
  it('creates BOTS_STAND_BOT_SUCCESS when standBot has been done', () => {
    const id = 1;
    axiosMock
      .onPut(`${endPoint()}/api/v1/bots/${id}`).reply(200, {})

    const expectedActions = [
      { type: actions.BOTS_STAND_BOT_REQUEST},
      { type: actions.BOTS_STAND_BOT_SUCCESS, bot: {} }
    ]
    const store = mockStore({ bots: [] })

    return store.dispatch(actions.standBots(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });
})
