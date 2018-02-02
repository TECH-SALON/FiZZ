// Garageとはユーザーのマイページのこと
// このページでは、Botの登録（削除・修正（未実装））、Botの練習、対戦履歴の確認、通知の確認（未実装）のほか、
// 一般的なマイページ機能を提供する

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from '../utils/Modal';
import Spinner from 'react-spinkit';

import BotsList from './BotsList';
import ResultsList from './ResultsList';
import RegisterModal from './RegisterModal';

import {
  Map as IMap, List as IList
} from 'immutable';

export default class Garage extends Component {

  static propTypes = {
    bots: PropTypes.object.isRequired,
    results: PropTypes.object.isRequired,
    onStandBot: PropTypes.func.isRequired,
    onPracticeBot: PropTypes.func.isRequired,
    onCreateBot: PropTypes.func.isRequired,
    onSetup: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.onSetup();
  }

  componentWillUpdate() {
  }

  render() {
    const { bots, results, botsLoading, resultsLoading, participants } = this.props;
    let botsLoadingClass = botsLoading ? "visible" : "hidden";
    let resultsLoadingClass = resultsLoading ? "visible" : "hidden";
    return(
      <div className="garage">
        <div className="over-lay"></div>
        <div className="contents-body">
          <div className="container">
            <div className="row margin-top-50">
              {/* Bots一覧及びアクション群 */}
              <div className="twelve columns">
                <div className="panel">
                  <div className="panel-heading">
                    <h3>Your Bots</h3>
                    <div className="loading">
                      <Spinner className={botsLoadingClass} name="double-bounce" color="white" fadeIn="quarter"/>
                    </div>
                  </div>
                  <div className="margin-top-15">
                    <RegisterModal onCreateBot={this.props.onCreateBot} createCompleted={this.props.createCompleted} username={this.props.username}/>
                  </div>
                  <BotsList
                    bots={bots}
                    botsLoading={botsLoading}
                    onBotEdited={this.props.onBotEdited}
                    onRequestCodeCheck={this.props.onRequestCodeCheck}
                    onRequestDeleteBot={this.props.onRequestDeleteBot}
                  />
                </div>
              </div>
              <div className="twelve columns">
                <div className="panel">
                  <div className="panel-heading">
                    <h3>Your Results</h3>
                    <div className="loading">
                      <Spinner className={resultsLoadingClass} name="double-bounce" color="white" fadeIn="quarter"/>
                    </div>
                  </div>
                  <ResultsList
                    results={results}
                    onGetResult={this.props.onGetResult}
                    resultsLoading={resultsLoading}
                    participants={participants}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
