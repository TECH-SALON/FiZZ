import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


export default class Match extends Component {
  // static propTypes = {
  //
  // }

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
                  <li><Link to="/Garage">Garage</Link></li>
                  <li><Link to="/Match">Match</Link></li>
                  <li><Link to="/Docs">Docs</Link></li>
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
                    <button className="button-primary">Add Your Bot</button>
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
                            <button className="practice-button margin-top-5">Match!</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Bot1</td>
                          <td>toshi443</td>
                          <td>30%</td>
                          <td>
                            <button className="practice-button margin-top-5">Match!</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Bot1</td>
                          <td>toshi443</td>
                          <td>30%</td>
                          <td>
                            <button className="practice-button margin-top-5">Match!</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Bot1</td>
                          <td>toshi443</td>
                          <td>30%</td>
                          <td>
                            <button className="practice-button margin-top-5">Match!</button>
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
                                  <button className="button detail-button margin-top-5">Detail</button>
                                </td>
                              </tr>
                              <tr>
                                <td>Bot1</td>
                                <td>ReversiBot</td>
                                <td>30%</td>
                                <td>
                                  <button className="button detail-button margin-top-5">Detail</button>
                                </td>
                              </tr>
                              <tr>
                                <td>Bot1</td>
                                <td>ReversiBot</td>
                                <td>30%</td>
                                <td>
                                  <button className="button detail-button margin-top-5">Detail</button>
                                </td>
                              </tr>
                              <tr>
                                <td>Bot1</td>
                                <td>ReversiBot</td>
                                <td>30%</td>
                                <td>
                                  <button className="button detail-button margin-top-5">Detail</button>
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
                                  <button className="button detail-button margin-top-5">Detail</button>
                                </td>
                              </tr>
                              <tr>
                                <td>Bot2</td>
                                <td>ReversiBot2</td>
                                <td>40%</td>
                                <td>
                                  <button className="button detail-button margin-top-5">Detail</button>
                                </td>
                              </tr>
                              <tr>
                                <td>Bot3</td>
                                <td>ReversiBot3</td>
                                <td>60%</td>
                                <td>
                                  <button className="button detail-button margin-top-5">Detail</button>
                                </td>
                              </tr>
                              <tr>
                                <td>Bot1</td>
                                <td>ReversiBot</td>
                                <td>30%</td>
                                <td>
                                  <button className="button detail-button margin-top-5">Detail</button>
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
