import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from '../utils/Modal';

import AddForm from './AddForm';
import OpponentsList from './OpponentsList';
import ResultsList from './ResultsList';
import BotsList from './BotsList';

export default class Match extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
    this.state = {
      addNewModal: false,
      detailModal: false,
      matchModal: false,
      resultModal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount(){
    this.props.onSetup();
  }

  openModal(modalName) {
    this.setState({[modalName]: true});
  }
  closeModal(modalName) {
    this.setState({[modalName]: false});
  }

  renderModals() {
    return(
      <div>

        <Modal
          isOpen={this.state.detailModal}
          onRequestClose={() => this.closeModal("detailModal")}
        >
          <h3>Bot's details</h3>
        </Modal>
        <Modal
          isOpen={this.state.resultModal}
          onRequestClose={() => this.closeModal("resultModal")}
        >
          <h3>Result</h3>
        </Modal>
        <Modal
          isOpen={this.state.matchModal}
          onRequestClose={() => this.closeModal("matchModal")}
          title="Match with this bot"
          description="このBotと対戦させる自分のBotを選択しましょう"
        >
          <form>
            <label htmlFor="botsOption">Select your bot</label>
            <select className="u-full-width" id="botsOption">
              <option value="Option 1">bot1</option>
              <option value="Option 2">bot2</option>
              <option value="Option 3">bot3</option>
            </select>
            <input className="button-primary" type="submit" value="Submit"/>
          </form>
        </Modal>
      </div>
    )
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
              <div className="twelve columns">
                <div className="panel">
                  <div className="panel-heading">
                    <h3>Bots seeking opponents</h3>
                  </div>
                  <div className="margin-top-15">
                    <AddForm onRegisterBot={this.props.onRegisterBot}/>
                  </div>
                  <OpponentsList bots={this.props.bots} />
                </div>
              </div>
              <div className="twelve columns">
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
                        <ResultsList />
            					</TabPanel>
            					<TabPanel>
                        <BotsList />
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
