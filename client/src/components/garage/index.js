// Garageとはユーザーのマイページのこと
// このページでは、Botの登録（削除・修正（未実装））、Botの練習、対戦履歴の確認、通知の確認（未実装）のほか、
// 一般的なマイページ機能を提供する

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from '../utils/Modal';

import BotsList from './BotsList';
import ResultsList from './ResultsList';
import RegisterForm from './RegisterForm';


export default class Garage extends Component {

  static propTypes = {
    bots: PropTypes.object.isRequired,
    onStandBot: PropTypes.func.isRequired,
    onPracticeBot: PropTypes.func.isRequired,
    onRegisterBot: PropTypes.func.isRequired,
    onSetup: PropTypes.func.isRequired
  }

  constructor() {
    super();
  }

  componentWillMount(){
    this.props.onSetup();
  }

  componentWillUpdate() {
    console.log(this.props);
  }
  render() {
    const { bots, results } = this.props;
    {console.log(bots)};
    return(
      <div className="garage">
        <div className="over-lay"></div>
        <div className="contents-body">
          <div className="container">
            <div className="row margin-top-25">
              <h1 className="page-title">Garage</h1>
              <div className="page-menu">
                <ul>
                  <li><Link to="/garage">Garage</Link></li>
                  <li><Link to="/match">Match</Link></li>
                  <li><Link to="/docs">Docs</Link></li>
                </ul>
              </div>
            </div>
            <div className="row margin-top-25">
              {/* Bots一覧及びアクション群 */}
              <div className="twelve columns">
                <div className="panel">
                  <div className="panel-heading">
                    <h3>Your Bots</h3>
                  </div>
                  <div className="margin-top-15">
                    <RegisterForm onRegisterBot={this.props.onRegisterBot}/>
                  </div>
                  <BotsList bots={bots} onPracticeBot={this.props.onPracticeBot}/>
                </div>
              </div>
              <div className="twelve columns">
                <div className="panel">
                  <div className="panel-heading">
                    <h3>Your Results</h3>
                  </div>
                  <ResultsList results={results}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
