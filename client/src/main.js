'use strict';

import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable'
import configureStore, { history } from './stores/configureStore';
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

const theme = createMuiTheme({
  overrides: {
    MuiPopover: {
      paper: {
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      }
    }
  }
});

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
