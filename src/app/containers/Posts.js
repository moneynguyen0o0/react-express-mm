import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { array, func } from 'prop-types';
import { connect } from 'react-redux';
import { fetchAll as fetchPosts } from 'app/flux/actions/post';
import ListPosts from 'app/components/news/ListPosts';

class Posts extends Component {
  static displayName = 'Posts'

  static propTypes = {
    posts: array,
    fetchPosts: func.isRequired,
  }

  static fetchData() {
    return fetchPosts();
  }

  componentDidMount() {
    const {
      posts,
      fetchPosts
    } = this.props;

    if (!posts.length) {
      fetchPosts();
    }
  }

  render() {
    const { posts } = this.props;

    return (
      <div className="Page Page-posts">
        <Helmet title="Posts" />
        <ListPosts posts={posts} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { posts = [] } = state.post;

  return {
    posts
  };
};

export default connect(mapStateToProps, { fetchPosts })(Posts);