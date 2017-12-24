import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { get as fetchImages } from 'app/flux/actions/giphy';
import Giphy from 'app/components/media/Giphy';

class ImageGIFs extends Component {
  static displayName = 'ImageGIFs'

  static propTypes = {
    data: object,
    fetchImages: func.isRequired
  }

  static fetchData() {
    return fetchImages();
  }

  componentDidMount() {
    const {
      data: {
        images = []
      } = {},
      fetchImages
    } = this.props;

    if (!images.length) {
      fetchImages();
    }

    window.addEventListener('scroll', this._handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll);
  }

  _handleScroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      this._loadMore();
    }
  }

  _loadMore() {
    const {
      data: {
        images = []
      } = {},
      fetchImages
    } = this.props;

    const offset = images.length;

    fetchImages(offset);
  }

  render() {
    const {
      data: {
        images = []
      } = {}
    } = this.props;

    return (
      <div className="Page Page-imageGiFs">
        <Helmet title="Funny Images" />
        <Giphy images={images} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.giphy
});

export default connect(mapStateToProps, { fetchImages })(ImageGIFs);
