import {
  Map as IMap, List as IList
} from 'immutable';

const initialState = IMap({
  loaded: false,
  isLoading: true,
  error: IMap(),
});

export default function reduce(state = initialState, action) {
  switch (action.type) {
  default:
    return state;
  }
}
