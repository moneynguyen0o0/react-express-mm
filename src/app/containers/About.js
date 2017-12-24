import React, { Component } from 'react';

export default class About extends Component {
  static displayName = 'About'

  render() {
    return (
      <div className="Page Page-about">
        <div className="About-app">
          <h3>React-Express-MM</h3>
          <p>
            An application built with great technologies:
          </p>
          <ul>
            <li>Express</li>
            <li>React</li>
            <li>React Router</li>
            <li>Redux</li>
            <li>SCSS</li>
            <li>Webpack</li>
            <li>Babel</li>
          </ul>
          <p>
            And Restful API, Server Side Rendering (SSR) and ES6, ES7 Support
          </p>
        </div>
      </div>
    );
  }
}
