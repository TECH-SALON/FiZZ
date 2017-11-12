import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 

export default class Docs extends Component {
  // static propTypes = {
  //
  // }

  componentWillMount(){
    this.props.onSetup();
  }

  render() {
    return(
      <div className="garage">
        <div className="contents-body">
          <div className="container">
            <div className="row margin-top-25">
              <h1 className="page-title">Garage</h1>
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
                    <h3>Your Bots</h3>
                  </div>
                  <div className="margin-top-15">
                    <button className="button-primary">Add New</button>
                  </div>
                  <div className="table">
                    <table className="u-full-width">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Game</th>
                          <th>%</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Bot1</td>
                          <td>NotQualified</td>
                          <td>Reversi</td>
                          <td>30%</td>
                          <td>
                            <button className="button detail-button margin-top-5">Detail</button> <button className="practice-button margin-top-5">Practice</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Bot2</td>
                          <td>NotQualified</td>
                          <td>Reversi</td>
                          <td>30%</td>
                          <td>
                            <button className="button detail-button margin-top-5">Detail</button> <button className="practice-button margin-top-5">Practice</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Bot3</td>
                          <td>NotQualified</td>
                          <td>Reversi</td>
                          <td>30%</td>
                          <td>
                            <button className="button detail-button margin-top-5">Detail</button> <button className="practice-button margin-top-5">Practice</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Bot4</td>
                          <td>NotQualified</td>
                          <td>Reversi</td>
                          <td>30%</td>
                          <td>
                            <button className="button detail-button margin-top-5">Detail</button> <button className="practice-button margin-top-5">Practice</button>
                          </td>
                        </tr>
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
