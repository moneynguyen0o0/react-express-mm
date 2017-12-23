import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  static displayName = 'Header'

  render() {
    return (
      <div className="Header">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/images">Images</Link></li>
        </ul>
      </div>
    );
  }
}
