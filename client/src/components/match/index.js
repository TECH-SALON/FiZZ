import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from '../utils/Modal';


export default class Match extends Component {
  // static propTypes = {
  //
  // }

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
          isOpen={this.state.addNewModal}
          onRequestClose={() => this.closeModal("addNewModal")}
        >
          <h3>Add your bot</h3>
        </Modal>
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
        >
          <h3>Match bot</h3>
        </Modal>
      </div>
    )
  }

  render() {
    return(
      <div className="match">
        {this.renderModals()}
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
                    <button className="button-primary" onClick={() => this.openModal("addNewModal")}>Add Your Bot</button>
                  </div>
                  <div className="table">
                    <table className="u-full-width">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Author</th>
                          <th>Win%</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Bot1</td>
                          <td>toshi443</td>
                          <td>30%</td>
                          <td>
                            <button className="practice-button margin-top-5" onClick={() => this.openModal("matchModal")}>Match!</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Bot1</td>
                          <td>toshi443</td>
                          <td>30%</td>
                          <td>
                            <button className="practice-button margin-top-5" onClick={() => this.openModal("matchModal")} >Match!</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Bot1</td>
                          <td>toshi443</td>
                          <td>30%</td>
                          <td>
                            <button className="practice-button margin-top-5" onClick={() => this.openModal("matchModal")}>Match!</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Bot1</td>
                          <td>toshi443</td>
                          <td>30%</td>
                          <td>
                            <button className="practice-button margin-top-5" onClick={() => this.openModal("matchModal")}>Match!</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
                        <div className="table">
                          <table className="u-full-width">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Opponent</th>
                                <th>Win%</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Bot1</td>
                                <td>ReversiBot</td>
                                <td>30%</td>
                                <td>
                                  <button className="button detail-button margin-top-5" onClick={() => this.openModal("resultModal")}>Detail</button>
                                </td>
                              </tr>
                              <tr>
                                <td>Bot1</td>
                                <td>ReversiBot</td>
                                <td>30%</td>
                                <td>
                                  <button className="button detail-button margin-top-5" onClick={() => this.openModal("resultModal")}>Detail</button>
                                </td>
                              </tr>
                              <tr>
                                <td>Bot1</td>
                                <td>ReversiBot</td>
                                <td>30%</td>
                                <td>
                                  <button className="button detail-button margin-top-5" onClick={() => this.openModal("resultModal")}>Detail</button>
                                </td>
                              </tr>
                              <tr>
                                <td>Bot1</td>
                                <td>ReversiBot</td>
                                <td>30%</td>
                                <td>
                                  <button className="button detail-button margin-top-5" onClick={() => this.openModal("resultModal")}>Detail</button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
            					</TabPanel>
            					<TabPanel>
                        <div className="table">
                          <table className="u-full-width">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Win%</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Bot1</td>
                                <td>ReversiBot</td>
                                <td>30%</td>
                                <td>
                                  <button className="button detail-button margin-top-5" onClick={() => this.openModal("detailModal")}>Detail</button>
                                </td>
                              </tr>
                              <tr>
                                <td>Bot2</td>
                                <td>ReversiBot2</td>
                                <td>40%</td>
                                <td>
                                  <button className="button detail-button margin-top-5" onClick={() => this.openModal("detailModal")}>Detail</button>
                                </td>
                              </tr>
                              <tr>
                                <td>Bot3</td>
                                <td>ReversiBot3</td>
                                <td>60%</td>
                                <td>
                                  <button className="button detail-button margin-top-5" onClick={() => this.openModal("detailModal")}>Detail</button>
                                </td>
                              </tr>
                              <tr>
                                <td>Bot1</td>
                                <td>ReversiBot</td>
                                <td>30%</td>
                                <td>
                                  <button className="button detail-button margin-top-5" onClick={() => this.openModal("detailModal")}>Detail</button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
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
