// ユーザーに関わるアクション群
// signIn: ユーザーがログインした時にログインの有無を更新し、ユーザー情報をstateに保存
// signOut: ユーザーがログアントした時にログインの有無を更新

import Dispatcher from '../dispatcher';
import React from 'react';
import AWS from 'aws-sdk';
import $ from 'jquery';

const UserActions = {
  signIn(name,email,imageUrl) {
    Dispatcher.dispatch({
      type: 'userSignIn',
      name,
      email,
      imageUrl,
    });
  },
  signOut() {
    let user = gapi.auth2.getAuthInstance();
    user.signOut();
    Dispatcher.dispatch({
      type: 'userSignOut'
    });
  }
}

export default UserActions;
