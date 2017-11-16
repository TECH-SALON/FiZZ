import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from '../utils/Modal';

import MatchForm from './MatchForm';
import OpponentsList from './OpponentsList';
import ResultsList from './ResultsList';
import BotsList from './BotsList';

export default class Match extends Component {
  static propTypes = {

  }

  componentWillMount(){
    this.props.onSetup();
  }

  render() {
    return(
      <div className="match">
        <div className="contents-body">
          <div className="container">
            <div className="row margin-top-25">
              <h1 className="page-title">Match</h1>
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
              <div className="four columns">
                <div className="panel">
                  <div className="panel-heading">
                    <h3>Match bots</h3>
                  </div>
                  <div className="margin-top-15">
                    <MatchForm bots={this.props.bots} onMatchRun={this.props.onMatchRun}/>
                  </div>
                </div>
              </div>
              <div className="eight columns">
                <div className="panel">
                  <div className="panel-heading">
                    <h3>Your Status</h3>
                  </div>
                  <div>
            				<Tabs>
            					<TabList>
            						<Tab>Results</Tab>
            						<Tab>Your bot status</Tab>
            					</TabList>
            					<TabPanel>
                        <ResultsList results={this.props.results}/>
            					</TabPanel>
            					<TabPanel>
                        <BotsList bots={this.props.bots}/>
            					</TabPanel>
            				</Tabs>
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
