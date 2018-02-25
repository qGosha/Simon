import React, { Component } from 'react';
import { ColorPanel } from './ColorPanel';
import './App.css';

export class App extends Component {
  // constructor(props) {
  //  super(props);
  //  this.state = {
  //    game: false;
  //    strict: false;
  //
  //  }
  //
  // }


  render() {
    return (
      <div className="App">
      <ColorPanel />

      </div>
    );
  }
}
