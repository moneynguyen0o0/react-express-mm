import React, { Component } from 'react';
import { oneOf } from 'prop-types';

export default class Spinner extends Component {
  static displayName = 'Spinner'
  
  static propTypes = {
    type: oneOf(['spin', 'bars'])
  }

  static defaultProps = {
    type: 'spin'
  }

  render() {
    const { type } = this.props;
    
    return (
      <div className="Spinner">
        <div className={`Spinner-icon Spinner-${type}`} />
      </div>
    );
  }
}
