// ログインしていないユーザー向けのナビゲーションメニュー

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppActions from '../../actions/AppActions';
import UserActions from '../../actions/UserActions';
import BotActions from '../../actions/BotActions';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import whiteLogo from '../../assets/utils/logo-white.svg';
import Logo from '../../assets/utils/logo.svg';

export default class VisitorNav extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    // ここからGoogle認証のための処理
    let auth2 = gapi.auth2.getAuthInstance();
    let element = ReactDOM.findDOMNode(this.refs.gSignin);
    let reactObj = this;
    auth2.attachClickHandler(element, {},
      function(googleUser) {
        reactObj.closeModal();
        reactObj.googleSignIn(googleUser);
      }, function(error) {
        console.log(error);
      }
    );
    // ここまでGoogle認証のための処理

    let $navbar = $(".visitor-nav");
    $(window).scroll(function() {
      // windowの上から700px以降はナビゲーションを上部に固定する
      if ($(window).scrollTop() > 700) {
        $navbar.addClass("fixed");
        $("#nav-logo").attr("src", Logo);
      } else {
        $("#nav-logo").attr("src", whiteLogo);
        $navbar.removeClass("fixed");
      }
    });
  }

  googleSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    let profile = googleUser.getBasicProfile();
    let name = profile.getName();
    let email = profile.getEmail();
    let imageUrl = profile.getImageUrl();
    AppActions.awsRefresh(id_token);
    UserActions.signIn(name,email,imageUrl);
    BotActions.fetchBotsFromDB();
  }

  // ログイン画面のモーダル機能
  openModal() {
    $("body").append('<div id="modal-overlay"></div>');
    $("#modal-overlay").click(this.closeModal);
    $("#modal-overlay").fadeIn("fast");
    $("#modal-content").fadeIn("fast");
    this.centeringModalSyncer()
  }

  closeModal() {
    $("#modal-content,#modal-overlay").fadeOut("fast",function(){
	  $("#modal-overlay").remove();
    });
  }

  //モーダル画面を画面にセンタリングをする関数
  centeringModalSyncer(){
  	var w = $(window).width();
  	var h = $(window).height();
  	var cw = $("#modal-content").width();
  	var ch = $("#modal-content").height();
  	var pxleft = ((w - cw)/2);
  	var pxtop = ((h - ch)/3);
  	$("#modal-content").css({"left": pxleft + "px"});
  	$("#modal-content").css({"top": pxtop + "px"});
  }

  render() {
    return(
      <div className="visitor-nav">
        <div className="container">
          <div className="logo-nav">
            <Link to="/">
              <div className="logo">
                <img id="nav-logo" src={whiteLogo}/>
              </div>
            </Link>
          </div>
          <div className="menu-top">
            <ul>
              <li><a onClick={this.openModal.bind(this)}>SignUp</a></li>
              <div id="modal-content">
                <a ref="gSignin" className="button">Google Signin</a>
              </div>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
