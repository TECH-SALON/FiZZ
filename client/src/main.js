'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable'
import configureStore, { history } from './store/configureStore';
import Root from './containers/RootContainer.js';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import AppContainer from './containers/AppContainer';

export const store = configureStore();

export default class App extends React.Component {
  componentWillMount(){
  }
  render(){
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <RootContainer />
        </ConnectedRouter>
      </Provider>
    );
  }
}

const theme = createMuiTheme();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
  ,
  document.getElementById("root")
);
