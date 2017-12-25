import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAll as fetchPosts } from 'app/flux/actions/post';

const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

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
        {
          posts.map((post, index) => {
            const { id, title = '', body = '' } = post;

            return (
              <div key={index}>
                <Link to={`/story/${id}/${slugify(title)}`}><h3>{title}</h3></Link>
                <p>{body}</p>
              </div>
            );
          })
        }
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