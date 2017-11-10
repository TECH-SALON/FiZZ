import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RobotoImg from '../../assets/robots/intro-roboto_2.svg';

export default class TopPage extends Component {

  render() {
    return(
      <div className="top-page">
        <section className="hero-section">
          <div className="container">
            <div className="section-title">
              <h2>WELCOME TO FiZZ<span className="red-dot">.</span></h2>
              <p className="sub-title">FIGHT! GAMEBOT!</p>
            </div>
          </div>
        </section>
        <section className="intro-section">
          <div className="container">
            <div className="section-title">
              <h2>INTRO TO FiZZ<span className="red-dot">.</span></h2>
              <p className="sub-title">What is FiZZ??</p>
            </div>
            <div className="section-container">
              <div className="row">
                <div className="eight columns">
                  <p>FiZZはゲームAIの対戦プラットフォームです。サイト上に用意されているゲームであれば、API仕様にのっとり自分でAIを作成し、
                    そのAIを登録することができます。<br/>
                    登録したAIは他の人が登録したAIと対戦させることができ、その対戦データを取得することができます。<br/>
                    ゲームAIを一緒に作って楽しみましょう！
                  </p>
                </div>
                <div className="four columns">
                  <img src={RobotoImg}/>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mechanism-section">
          <div className="container">
            <div className="section-title">
              <h2>MECHANISM<span className="red-dot">.</span></h2>
              <p className="sub-title">HOW DOES IT WORKS?</p>
            </div>
            <div className="section-container">
              <p>
                こちらのドキュメントをみてください。
              </p>
              <Link to="/" className="button">DOCS is here.</Link>
            </div>
          </div>
        </section>
        <section className="tutorial-section">
          <div className="container">
            <div className="section-title">
              <h2>TUTORIAL<span className="red-dot">.</span></h2>
              <p className="sub-title">LET'S MAKE TIC_TAC_TOE AI.</p>
            </div>
            <div className="section-container">
              <p>Tutorial is coming soon.</p>
            </div>
          </div>
        </section>
        <section className="games-section">
          <div className="container">
            <div className="section-title">
              <h2>GAMES<span className="red-dot">.</span></h2>
              <p className="sub-title">MORE GAMES COMING SOON.</p>
            </div>
          </div>
        </section>
        <section className="schedule-section">
          <div className="container">
            <div className="section-title">
              <h2>SCHEDULE<span className="red-dot">.</span></h2>
              <p className="sub-title">UPDATES IS COMING</p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
