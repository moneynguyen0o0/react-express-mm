import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array } from 'prop-types';

export default class StationImages extends Component {
  static displayName = 'StationImages'

  static propTypes = {
    images: array.isRequired
  };

  render() {
    const { images } = this.props;

    return (
      <div className="StationImages">
        {
          images.map((image, index) => (<img key={index} src={image} />))
        }
      </div>
    );
  }
}
