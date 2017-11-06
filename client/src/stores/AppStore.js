import { ReduceStore } from 'flux/utils';
import Dispatcher from '../dispatcher';

class AppStore extends ReduceStore {
  getInitialState() {
    return {
      loading: true,
      logined: false,
      profile: {
        name: '',
        email: '',
        imageUrl: '',
      },
      myBots: [],
      myOxBots: [],
      myReversiBots: [],
      oxBots: [],
      reversiBots: [],
      myBattleResults: [],
      myPracticeResults: [],
      myOxResults: [],
      myReversiResults: []
    }
  }
  reduce(state, action) {
    switch(action.type) {
      case 'loadingDone':
        return Object.assign({}, state, {
          loading: false,
        });
      case 'checkUserSigned':
        return Object.assign({}, state, {
          loading: false,
          logined: true,
          profile: {
            name: action.name,
            email: action.email,
            imageUrl: action.email,
          }
        });
      case 'userSignIn':
        return Object.assign({}, state, {
          logined: true,
          profile: {
            name: action.name,
            email: action.email,
            imageUrl: action.email,
          }
        });
      case 'userSignOut':
        return Object.assign({}, state, {
          logined: false,
          profile: {
            name: '',
            email: '',
            imageUrl: ''
          }
        });
      case 'registerBot':
        let newBot = {
          botName: action.botName,
          imageName: action.imageName,
          gameName: action.gameName
        };
        return Object.assign({}, state, {
          myBots: [newBot, ...state.myBots]
        });
      case 'fetchBots':
        return Object.assign({}, state, {
          myBots: action.myBots,
          myOxBots: action.myOxBots,
          myReversiBots: action.myReversiBots,
          oxBots: action.oxBots,
          reversiBots: action.reversiBots,
          myBattleResults: action.myBattleResults,
          myPracticeResults: action.myPracticeResults,
          myOxResults: action.myOxResults,
          myReversiResults: action.myReversiResults
        });
      case 'addPracticeResult':
        let newResult = {
          botName: action.botName,
          imageName: action.imageName,
          createdAt: action.createdAt,
          result: action.result,
        };
        return Object.assign({}, state, {
          storedResults: [...state.storedResults, newResult]
        });
      default:
        return state;
    }
  }
}

export default new AppStore(Dispatcher);
