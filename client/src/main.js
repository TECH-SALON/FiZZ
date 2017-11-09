'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable'
import configureStore, { history } from './store/configureStore';
import RootContainer from './containers/RootContainer.js';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

export const store = configureStore();

class App extends React.Component {
  componentWillMount(){
  }
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <RootContainer />
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

const theme = createMuiTheme();

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
