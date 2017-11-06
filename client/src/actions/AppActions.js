// 外部APIとの通信や、アプリ全体に関わる状態管理のためのアクション群
// loadingDone: ローディングが完了したらstateを変更
// checkUserSigned: ユーザーがログインしていたらcognito情報取得、Botの取得を行う
// awsRefresh: ログインユーザーのcognito情報の取得

import Dispatcher from '../dispatcher';
import React from 'react';
import AWS from 'aws-sdk';
import $ from 'jquery';

import BotActions from './BotActions';

const AppActions = {
  loadingDone() {
    Dispatcher.dispatch({
      type: 'loadingDone'
    });
  },

  checkUserSigned() {
    gapi.load('auth2', function() {
      let auth2 = gapi.auth2.init({
        client_id: '897071335358-9dqqmar2u5c4fbo48kujh92jbb58amu9.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      }).then(auth => {
        if (auth.isSignedIn.get()) {
          let currentUser = auth.currentUser.get();
          let id_token = currentUser.getAuthResponse().id_token;
          let profile = currentUser.getBasicProfile();
          let name = profile.getName();
          let email = profile.getEmail();
          let imageUrl = profile.getImageUrl();
          // ユーザーがすでにログインしていた場合、cognitoトークン取得及びDBからBotを取得する
          AppActions.awsRefresh(id_token).then(
            BotActions.fetchBotsFromDB().then(
              () => Dispatcher.dispatch({
                type: 'checkUserSigned',
                name: name,
                email: email,
                imageUrl: imageUrl
              })
            )
          )
        } else {
          AppActions.loadingDone();
        }
      });
    });
  },
  awsRefresh(id_token) {
    return new Promise((resolve) => {
      AWS.config.update({
        region: 'ap-northeast-1',
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'ap-northeast-1:3b3241df-ce78-4501-861e-90caf430171b',
          Logins: {
            'accounts.google.com': id_token
          }
        })
      });
      AWS.config.credentials.refresh(function(err) {
        if(err) {
          console.log(err);
        } else {
          resolve();
        }
      });
    });
  },
}

export default AppActions;
