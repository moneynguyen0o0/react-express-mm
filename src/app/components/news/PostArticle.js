import React, { Component } from 'react';
import { object } from 'prop-types';
import Helmet from 'react-helmet';
import Loader from 'app/components/shared/Loader';

class PostArticle extends Component {
  static displayName = 'PostArticle'

  static propTypes = {
    post: object
  }

  render() {
    const { post: { title = '', body = '' } = {} } = this.props;

    return (
      <div className="PostArticle">
        <Helmet title={title} />
        <div>
          <h1 className="PostArticle-title">{title}</h1>
          <p className="PostArticle-content">{body}</p>
        </div>
      </div>
    );
  }
}

export default Loader('post')(PostArticle);