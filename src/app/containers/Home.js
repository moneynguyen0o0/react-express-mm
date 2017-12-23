import React, { Component } from 'react';

export default class Home extends Component {
  static displayName = 'Home'

  render() {
    return (
      <div className="Page-home">
        <h1>React-Express-MM</h1>
        <div className="logo"></div>
      </div>
    );
  }
}
