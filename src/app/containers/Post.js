import _ from 'lodash';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { find as findPost } from 'app/flux/actions/post';

class Post extends Component {
  static displayName = 'Post'

  static propTypes = {
    post: object,
    findPost: func.isRequired,
    match: object.isRequired
  }

  static fetchData(match = {}) {
    const {
      params: {
        id
      } = {}
    } = match;
    
    return findPost(id);
  }

  componentDidMount() {
    const {
      post,
      findPost,
      match: {
        params: {
          id
        } = {}
      }
    } = this.props;

    if (_.isEmpty(post)) {
      findPost(id);
    }
  }

  render() {
    const { post } = this.props;

    const { title = '', body = '' } = post;

    return (
      <div className="Page Page-post">
        <Helmet title={title} />
        <div>
          <h1>{title}</h1>
          <p>{body}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { post = {} } = state.post;

  return {
    post
  };
};

export default connect(mapStateToProps, { findPost })(Post);