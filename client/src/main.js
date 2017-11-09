'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import AppContainer from './containers/AppContainer';


const theme = createMuiTheme();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={AppContainer}/>
        </Switch>
      </BrowserRouter>
    </div>
  </MuiThemeProvider>
  ,
  document.getElementById("root")
);
