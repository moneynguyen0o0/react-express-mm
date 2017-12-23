import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { array } from 'prop-types';
import { connect } from 'react-redux';

export default class StationImages extends Component {
  static displayName = 'StationImages'

  static propTypes = {
    images: array.isRequired
  };

  render() {
    const { images } = this.props;

    return (
      <div className="StationImages">
        <Row>
          {
            images.map((image, index) => (
              <Col key={index} xs="6" md="4" lg="3">
                <div className="StationImages-imageWrapper">
                  <img src={image} />
                </div>
              </Col>
            ))
          }
        </Row>
      </div>
    );
  }
}
