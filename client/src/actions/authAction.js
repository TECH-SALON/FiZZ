import api, {endPoint} from '../api';

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';

export const AUTH_SIGHUP = 'AUTH_SIGHUP';
export const AUTH_SIGHUP_REQUEST = 'AUTH_SIGHUP_REQUEST';
export const AUTH_SIGHUP_SUCCESS = 'AUTH_SIGHUP_SUCCESS';
export const AUTH_SIGHUP_FAIL = 'AUTH_SIGHUP_FAIL';

export const AUTH_GET_CURRENT_USER = 'AUTH_GET_CURRENT_USER';
export const AUTH_GET_CURRENT_USER_SUCCESS = 'AUTH_GET_CURRENT_USER';

export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_LOGOUT_REQUEST = 'AUTH_LOGOUT_REQUEST';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_FAIL = 'AUTH_LOGOUT_FAIL';

export function login(auth) {
  return(dispatch, getState) => {
    dispatch(loginRequest());
    let url = `${endPoint()}/auth/login`;
    api(getState).post(url, auth).then( response => {
      console.log(response.data);
      dispatch(loginSuccess(response.data));
    }).catch( error => {
      loginFail(error);
    })
  }
}

function loginRequest(){
  return {
    type: AUTH_LOGIN_REQUEST,
  }
}

function loginSuccess(auth){
  return {
    type: AUTH_LOGIN_SUCCESS,
    auth
  }
}

function loginFail(error){
  return {
    type: AUTH_LOGIN_FAIL,
    error,
  }
}


export function signup(auth) {
  return(dispatch, getState) => {
    dispatch(signupRequest());
    let url = `${endPoint()}/auth/signup`;
    console.log(url);
    api(getState).post(url, auth).then( response => {
      console.log(response);
      signupSuccess(response.data);
    }).catch( error => {
      signupFail(error);
    })
  }
}

function signupRequest(){
  return {
    type: AUTH_LOGIN_REQUEST,
  }
}

function signupSuccess(){
  return {
    type: AUTH_LOGIN_SUCCESS,
  }
}

function signupFail(error){
  return {
    type: AUTH_LOGIN_FAIL,
    error,
  }
}

export function getCurrentUser() {
  return(dispatch, getState) => {
    // dispatch(loginRequest());
    if (!localStorage.refreshToken) {
      return
    }
    const tokens = {
      refreshToken: localStorage.refreshToken,
    };
    const url = `${endPoint()}/auth/refresh`;
    api(getState).post(url, tokens).then( response => {
      const auth = response.data;
      dispatch(getCurrentUserSuccess(auth))
    }).catch( error => {
      console.log("error");
    })
  }
}

function getCurrentUserSuccess(auth) {
  return {
    type: AUTH_GET_CURRENT_USER_SUCCESS,
    auth
  }
}

export function logout(tokens) {
  return(dispatch, getState) => {
    dispatch(logoutRequest())
    console.log(tokens);
    const url = `${endPoint()}/auth/logout`;
    api(getState).post(url, tokens).then( response => {
      console.log(response);
      dispatch(logoutSuccess());
    }).catch( error => {
      console.log(error);
      dispatch(logoutFail())
    })
  }
}

function logoutRequest() {
  return {
    type: AUTH_LOGOUT_REQUEST
  }
}

function logoutSuccess() {
  return {
    type: AUTH_LOGOUT_SUCCESS
  }
}

function logoutFail() {
  return {
    type: AUTH_LOGOUT_FAIL
  }
}
