import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Link} from 'react-router-dom';
import reversiImage from '../../assets/games/reversi/reversi_image.svg';
import shogiImage from '../../assets/games/shogi/shogi_image2.svg';
import pazzle2048Image from '../../assets/games/pazzle2048/pazzle2048_2.svg';


export default class Games extends Component {
  static propTypes = {

  }

  componentWillMount(){
    // console.log("hello")
  }


  render() {
    return(
      <div className="games">
        <div className="games-back-image"></div>
        <div className="row margin-top-150">
          <div className="four columns">
            <div className="games-index">
              <div className="index-image">
                <img src={reversiImage}/>
              </div>
              <div className="index-heading">
                <h3>Reversi</h3>
              </div>
              <div className="margin-top-15">
                <Link to="/match/reversi" className="button button-primary">Go</Link>
              </div>
            </div>
          </div>
          <div className="four columns">
            <div className="games-index">
              <div className="index-image">
                <img src={shogiImage}/>
              </div>
              <div className="index-heading">
                <h3>Coming soon</h3>
              </div>
              <div className="margin-top-15">
              </div>
            </div>
          </div>
          <div className="four columns">
            <div className="games-index">
              <div className="index-image">
                <img src={pazzle2048Image}/>
              </div>
              <div className="index-heading">
                <h3>Coming soon</h3>
              </div>
              <div className="margin-top-15">
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
