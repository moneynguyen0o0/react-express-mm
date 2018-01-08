import _ from 'lodash';
import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { find as findPost } from 'app/flux/actions/post';
import {
  // makeGetFilteredPost,
  getFilteredPost
} from 'app/flux/selectors/post';
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

// const makeMapStateToProps = () => {
//   const getFilteredPost = makeGetFilteredPost();
//
//   const mapStateToProps = (state, props) => {
//     return {
//       post: getFilteredPost(state, props)
//     };
//   };
//
//   return mapStateToProps;
// };
//
// export default connect(makeMapStateToProps, { findPost })(Post);

const mapStateToProps = (state, props) => {
  return {
    post: getFilteredPost(state, props) // Clear 'post' in store when navigating to other post
  };
};

export default connect(mapStateToProps, { findPost })(Post);
