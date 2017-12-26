import _ from 'lodash';
import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { find as findPost } from 'app/flux/actions/post';
import { getFilteredPost } from 'app/flux/selectors/post';
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

    if (_.isEmpty(post) || post.id != id) {
      findPost(id);
    }
  }

  render() {
    const { post } = this.props;

    return (
      <div className="Page Page-post">
        {/* Pass the null value to post property to invoke loading or we can use loading component here as well*/}
        <PostArticle post={post} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: getFilteredPost(state)
  };
};

export default connect(mapStateToProps, { findPost })(Post);
