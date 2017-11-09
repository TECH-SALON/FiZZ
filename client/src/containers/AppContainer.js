// サイト全体のstate管理及び、ログインの有無によって表示の切り替えを行う

// 外部ライブラリなどのインクルード
import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';

// ストア及びアクションのインクルード
import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';

// レイアウトのインクルード
import UserNav from '../components/layouts/UserNav';
import VisitorNav from '../components/layouts/VisitorNav';
import Footer from '../components/layouts/Footer';

// ページ単位のインクルード
import DashBoard from '../pages/DashBoard';
import TopPage from '../pages/TopPage';
import Garage from '../components/garage/Garage';
import Battle from '../components/battle/Battle';


class AppContainer extends Component {
  constructor(props) {
    super(props);
    AppActions.checkUserSigned();
  }
  static getStores() {
    return [AppStore];
  }
  static calculateState() {
    return AppStore.getState();
  }

  render() {
    const { loading, logined } = this.state;
    if (loading) {
      return(
        <div>loading now</div>
      )
    };
    if (!logined) {
      return(
        <div>
          <header>
            <VisitorNav />
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={TopPage}/>
              <Route render={() => {
                return(
                  <Redirect to="/"/>
                );
              }
              }/>
            </Switch>
          </main>
          <footer>
            <Footer/>
          </footer>
        </div>
      )
    };
    return(
      <div>
        <header>
          <UserNav />
        </header>
        <main>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/dashboard"/>}/>
            <Route path="/dashboard" component={DashBoard}/>
            <Route path="/garage" render={() => <Garage
              userName={this.state.profile.name}
              myBots={this.state.myBots}
              myBattleResults={this.state.myBattleResults}
              myPracticeResults={this.state.myPracticeResults}/>}/>
            <Route path="/battle" render={() => <Battle
              // OXゲーム関連（Bot情報及び対戦履歴）
              myOxBots={this.state.myOxBots}
              myOxResults={this.state.myOxResults}
              oxBots={this.state.oxBots}
              oxResults={this.state.oxResults}
              // Reversi関連（Bot情報及び対戦履歴）
              myReversiBots={this.state.myReversiBots}
              myReversiResults={this.state.myReversiResults}
              reversiBots={this.state.reversiBots}
              reversiResults={this.state.reversiResults}/>}/>
            <Route render={() => <Redirect to="/dashboard"/>}/>
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    )
  }
}

export default Container.create(AppContainer);
