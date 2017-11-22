import reducer from '../../reducers/botsReducer';
import * as types from '../../actions/botsAction';
import {
  Map as IMap, List as IList
} from 'immutable';

describe('bots reducer', () => {
  let jsonText = '{"id":100,"name":"reversi_bot","description":"リバーシのbot","authorId":1,"gameId":1,"isPrivate":false,"qualified":false,"standBy":false,"repoUrl":"https://github.com/xxx/yyy","resultSummaries":null}';
  const bot = JSON.parse(jsonText);
  console.log(bot);
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(IMap(
      {
        items: IList(),
        loaded: false,
        isLoading: true,
        error: IMap(),
      }
    ))
  });
  it('should handle BOTS_GET_BOTS_SUCCESS', () => {
    expect(reducer(IList(), {
      type: types.BOTS_GET_BOTS_SUCCESS,
      bots:  bot
    })).toEqual(IMap(
      {
        items: IList([IMap({
          id: bot.id,
          botName: bot.name,
          description: bot.description,
          authorId: bot.authorId,
          gameId: bot.gameId,
          isPrivate: bot.isPrivate,
          qualified: bot.qualified,
          standBy: bot.standBy,
          repoUrl: bot.repoUrl,
          resultSummaries: null,
        })])
      }
    ))
  });
  //TODO resultSummariesのテストを行うこと

  it('should handle BOTS_REGISTER_BOT_SUCCESS', () => {
  });
  it('should handle BOTS_GET_BOT_SUCCESS', () => {
  });
  it('should handle BOTS_STAND_BOT_SUCCESS', () => {
  });
  it('should handle ERRORs', () => {
  });
});
