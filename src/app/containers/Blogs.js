import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { array, object, func } from 'prop-types';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { fetchAll as fetchBlogs } from 'app/flux/actions/blog';
import ListBlogs from 'app/components/news/ListBlogs';
import RelatedStories from 'app/components/news/RelatedStories';

class Blogs extends Component {
  static displayName = 'Blogs'

  static propTypes = {
    route: object.isRequired,
    blogs: array,
    fetchBlogs: func.isRequired,
  }

  static fetchData() {
    return fetchBlogs();
  }

  componentDidMount() {
    const {
      blogs,
      fetchBlogs
    } = this.props;

    if (!blogs.length) {
      fetchBlogs();
    }
  }

  render() {
    const {
      blogs,
      route: {
        routes
      }
    } = this.props;

    return (
      <div className="Page Page-blogs">
        <Helmet title="Blogs" />
        <ListBlogs blogs={blogs.slice(0, 10)} />
        { renderRoutes(routes) }
        <hr />
        <RelatedStories stories={blogs.slice(10, 15)} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { blogs = [] } = state.blog;

  return {
    blogs
  };
};

export default connect(mapStateToProps, { fetchBlogs })(Blogs);
