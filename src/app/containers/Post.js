import _ from 'lodash';
import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { find as findPost } from 'app/flux/actions/post';
import PostArticle from 'app/components/news/PostArticle';

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

    return (
      <div className="Page Page-post">
        <PostArticle post={post} />
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