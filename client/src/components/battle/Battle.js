// バトルページへの入り口で各ゲームの一覧及び各ゲームページへ適切な情報を流す

import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import GamesIndex from './GamesIndex';
import OxBattle from './OxBattle';
import ReversiBattle from './ReversiBattle';


export default class Battle extends Component {
  render() {
    return(
      <div className="battle">
        <div className="container">
          <Route exact path="/battle" render={() => <GamesIndex />}/>
          <Route path="/battle/oxGame" render={() => <OxBattle
            myOxBots={this.props.myOxBots}
            myOxResults={this.props.myOxResults}
            oxBots={this.props.oxBots}
            oxResults={this.props.oxResults}
            />}
          />
          <Route path="/battle/reversi" render={() => <ReversiBattle
            myReversiBots={this.props.myReversiBots}
            myReversiResults={this.props.myReversiResults}
            reversiBots={this.props.reversiBots}
            reversiResults={this.props.reversiResults}
            />}
          />
        </div>
      </div>
    )
  }
}
