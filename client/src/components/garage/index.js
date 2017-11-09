// Garageとはユーザーのマイページのこと
// このページでは、Botの登録（削除・修正（未実装））、Botの練習、対戦履歴の確認、通知の確認（未実装）のほか、
// 一般的なマイページ機能を提供する

import React, { Component } from 'react';
import PropTypes from 'prop-types';


import BotRegisterForm from './BotRegisterForm';
import BotPracticeForm from './BotPracticeForm';
import MyBotsTable from './MyBotsTable';
import PracticeResults from './PracticeResults';
import MyBattleResults from './MyBattleResults';

export default class Garage extends Component {
  static propTypes = {
    bots: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    matchSummaries: PropTypes.object.isRequired,
    onRegisterBot: PropTypes.func.isRequired,
    onSetup: PropTypes.func.isRequired
  }

  componentWillMount(){
    this.props.onSetup();
  }

  render() {
    { matchSummaries } = this.props
    return(
      <div className="garage">
        <div className="container">
          <div className="row">
            {/* Botの登録フォーム */}
            <div className="one-third column">
              <div className="contents-box">
                <BotRegisterForm />
              </div>
            </div>
            {/* 登録したBotで勝率95%以上の一覧 */}
            <div className="two-thirds column">
              <div className="contents-box">
                <MyBotsTable bots={this.props.myBots} />
              </div>
            </div>
          </div>
          <div className="row">
            {/* Botの練習対戦フォーム */}
            <div className="one-third column">
              <div className="contents-box">
                <BotPracticeForm bots={this.props.myBots} />
              </div>
            </div>
            {/* 自分のBotの練習試合履歴 */}
            <div className="two-thirds column">
              <div className="contents-box">
                <PracticeResults results={this.props.myPracticeResults} />
              </div>
            </div>
          </div>
          <div className="row">
            {/* 他の人のBotとの対戦履歴 */}
            <div className="twelve columns">
              <div className="contents-box">
                <MyBattleResults results={this.props.myBattleResults} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
