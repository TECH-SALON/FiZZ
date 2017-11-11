// Garageとはユーザーのマイページのこと
// このページでは、Botの登録（削除・修正（未実装））、Botの練習、対戦履歴の確認、通知の確認（未実装）のほか、
// 一般的なマイページ機能を提供する

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Garage extends Component {
  // static propTypes = {
  //   bots: PropTypes.object.isRequired,
  //   onStandBot: PropTypes.func.isRequired,
  //   onRegisterBot: PropTypes.func.isRequired,
  //   onSetup: PropTypes.func.isRequired
  // }

  componentWillMount(){
    this.props.onSetup();
  }

  render() {
    return(
      <div className="garage">
        <div className="contents-body">
          <div className="container">
            <div className="row">
              <h1 className="page-title">Garage</h1>
              <div className="page-menu">
                <ul>
                  <li><Link to="/Garage">Garage</Link></li>
                  <li>Match</li>
                  <li>Docs</li>
                </ul>
              </div>
            </div>
            <div className="row">
              {/* Bots一覧及びアクション群 */}
              <div className="twelve columns">
                <div className="panel">
                  <div className="table">
                    <table className="u-full-width">
                      <thead>
                        <tr>
                          <th>AI Name</th>
                          <th>Win</th>
                          <th>Lose</th>
                          <th>Draw</th>
                          <th>Time</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
