import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/botsAction'
import expect from 'expect'
import MockAdapter from 'axios-mock-adapter';

import {client, endPoint} from '../../api';
import {create} from '../utils';
import {
  Map as IMap, List as IList
} from 'immutable';

const middlewares = [thunk];
const axiosMock = new MockAdapter(client);
const mockStore = configureMockStore(middlewares);

describe('Async actions', () => {
  const bots = [
    {"id":100,"name":"reversi_bot","description":"リバーシのbot","authorId":1,"gameId":1,"isPrivate":false,"qualified":false,"standBy":false,"repoUrl":"https://github.com/xxx/yyy","resultSummaries":null},
    {"id":101,"name":"reversi_bot2","description":"リバーシのbot2","authorId":1,"gameId":1,"isPrivate":false,"qualified":false,"standBy":false,"repoUrl":"https://github.com/xxx/zzz","resultSummaries":null}
  ];

  //getBots
  it('creates BOTS_GET_BOTS_SUCCESS when getBots has been done', () => {
    // axiosMock
    //   .onGet(`${endPoint()}/api/v1/bots`).reply(200, bots)

    const expectedActions = [
      { type: actions.BOTS_GET_BOTS_REQUEST},
      { type: actions.BOTS_GET_BOTS_SUCCESS, bots: bots}
    ];

    const store = mockStore(IMap({ 'bots': actions.initialState }));
    console.log(store);
    console.log(store.getState())
    console.log(actions.getBots())
    const dis = store.dispatch(actions.getBots())
    console.log(dis);

    return dis.then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  //getBot
  it('creates BOTS_GET_BOT_SUCCESS when getBot has been done', () => {
    const id = 1
    const bot = bots[0]
    axiosMock
      .onGet(`${endPoint()}/api/v1/bots/${id}`).reply(200, bot)

    const expectedActions = [
      { type: actions.BOTS_GET_BOT_REQUEST},
      { type: actions.BOTS_GET_BOT_SUCCESS, bot: bot }
    ]

    const store = create();
    return store.dispatch(actions.getBot(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  //registerBot
  it('creates BOTS_REGISTER_BOT_SUCCESS when registerBot has been done', () => {
    const gameName = 'reversi';
    const bot = {};
    axiosMock
      .onPost(`${endPoint()}/api/v1/bots/${gameName}`).reply(201, bot)

    const expectedActions = [
      { type: actions.BOTS_REGISTER_BOT_REQUEST},
      { type: actions.BOTS_REGISTER_BOT_SUCCESS, bot: bot }
    ]

    const store = create();
    return store.dispatch(actions.registerBots(bot)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  //standBot
  it('creates BOTS_STAND_BOT_SUCCESS when standBot has been done', () => {
    const id = 1;
    axiosMock
      .onPut(`${endPoint()}/api/v1/bots/${id}`).reply(200, bot)

    const expectedActions = [
      { type: actions.BOTS_STAND_BOT_REQUEST},
      { type: actions.BOTS_STAND_BOT_SUCCESS, bot: bot }
    ]

    const store = create();
    return store.dispatch(actions.standBots(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });
})
