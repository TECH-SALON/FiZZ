import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class GamesIndex extends Component {
  componentDidMount(){
  }
  render() {
    return(
      <div className="games-index">
        <div className="row">
          <div className="one-third column">
            <p className="game-title">OxGame</p>
            <p className="game-description">OXゲームでAIsの作成に挑戦しましょう。</p>
            <Link to="/battle/oxGame" className="button">Go</Link>
          </div>
          <div className="one-third column">
            <p className="game-title">Reversi</p>
            <p className="game-description">オセロのゲームでAIの作成に挑戦しましょう。</p>
            <Link to="/battle/reversi" className="button">Go</Link>
          </div>
          <div className="one-third column">
            <p className="game-title">Shogi</p>
            <p className="game-description">将棋のゲームでAIの作成に挑戦しましょう。</p>
            <p className="game-description">coming soon....</p>
          </div>
        </div>
      </div>
    )
  }
}
