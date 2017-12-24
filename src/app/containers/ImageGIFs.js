import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { array, bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { fetch as fetchImageGIFs } from 'app/flux/actions/giphy';
import Giphy from 'app/components/media/Giphy';
import Spinner from 'app/components/icons/Spinner';

class ImageGIFs extends Component {
  static displayName = 'ImageGIFs'

  static propTypes = {
    images: array,
    isWaiting: bool,
    fetchImageGIFs: func.isRequired
  }

  static fetchData() {
    return fetchImageGIFs();
  }

  componentDidMount() {
    const {
      images,
      fetchImageGIFs
    } = this.props;

    if (!images.length) {
      fetchImageGIFs();
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
      images,
      fetchImageGIFs
    } = this.props;

    const offset = images.length;

    fetchImageGIFs(offset);
  }

  render() {
    const {
      images,
      isWaiting
    } = this.props;

    return (
      <div className="Page Page-imageGiFs">
        <Helmet title="Funny Images" />
        <Giphy images={images} />
        {isWaiting && <Spinner />}
      </div>
    );
  }
}

const mapStateToProps = ({ giphy }) => {
  const { images = [], isWaiting } = giphy;

  return {
    images,
    isWaiting
  };
};

export default connect(mapStateToProps, { fetchImageGIFs })(ImageGIFs);
