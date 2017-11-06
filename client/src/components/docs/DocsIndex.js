import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DocsIndex extends Component {
  render() {
    return(
      <div className="docs-index">
        <div className="container">
          <h1>Docs</h1>
          <Link to="/tictactoe-doc">TicTacToe</Link>
        </div>
      </div>
    )
  }
}
