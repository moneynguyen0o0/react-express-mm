import _ from 'lodash';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { find as findBlog } from 'app/flux/actions/blog';

class Blog extends Component {
  static displayName = 'Blog'

  static propTypes = {
    blog: object,
    findBlog: func.isRequired,
    match: object.isRequired
  }

  static fetchData(match = {}) {
    const {
      params: {
        id
      } = {}
    } = match;
    
    return findBlog(id);
  }

  componentDidMount() {
    const {
      blog,
      findBlog,
      match: {
        params: {
          id
        } = {}
      }
    } = this.props;

    if (_.isEmpty(blog)) {
      findBlog(id);
    }
  }

  render() {
    const {
      blog
    } = this.props;

    const { title = '', body = '' } = blog;

    return (
      <div className="Page Page-blog">
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
  const { blog = {} } = state.blog;

  return {
    blog
  };
};

export default connect(mapStateToProps, { findBlog })(Blog);
