import reducer from '../../reducers/botsReducer';
import * as types from '../../actions/botsAction';

describe('bots reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
  });
  it('should handle ERRORs', () => {
  });
  it('should handle BOTS_GET_BOTS_SUCCESS', () => {
  });
  it('should handle BOTS_REGISTER_BOT_SUCCESS', () => {
  });
  it('should handle BOTS_GET_BOT_SUCCESS', () => {
  });
  it('should handle BOTS_STAND_BOT_SUCCESS', () => {
  });
});
