import _ from 'lodash';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { find as findBlog } from 'app/flux/actions/blog';

class BlogArticle extends Component {
  static displayName = 'BlogArticle'

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
      blog: {
        id = '',
        title = '',
        body = ''
      } = {}
    } = this.props;

    return (
      <div className="BlogArticle">
        <Helmet title={title} />
        <div>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const { blog = {} } = state.blog;
  const { params = {} } = match;

  return {
    blog
  };
};

export default connect(mapStateToProps, { findBlog })(BlogArticle);

