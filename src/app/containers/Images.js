import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { get as fetchImages } from 'app/flux/actions/giphy';
import StationImages from 'app/components/media/StationImages';

class Images extends Component {
  static displayName = 'Images'

  static propTypes = {
    data: object
  };

  static fetchData() {
    return fetchImages();
  }

  componentDidMount() {
    const {
      data: {
        images = []
      } = {},
      dispatch
    } = this.props;

    if (!images.length) {
      dispatch(Images.fetchData());
    }
  }

  render() {
    const {
      data: {
        images = []
      } = {}
    } = this.props;

    const filteredImages = images.map((data) => {
      const {
        images: {
          original: {
            url
          } = {}
        } = {}
      } = data;

      return url;
    });

    return (
      <div>
        <Helmet title="Images" />
        <StationImages images={filteredImages} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.giphy
});

export default connect(mapStateToProps)(Images);
