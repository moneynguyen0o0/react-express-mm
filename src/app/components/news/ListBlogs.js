import React, { Component } from 'react';
import { array } from 'prop-types';
import { Link } from 'react-router-dom';

export default class ListBlogs extends Component {
  static displayName = 'ListBlogs'

  static propTypes = {
    blogs: array
  }

  render() {
    const { blogs } = this.props;

    return (
      <div className="ListBlogs">
        {
          blogs.map((blog, index) => {
            const {
              id,
              title
            } = blog;

            return (
              <div key={index}>
                <Link to={`/blogs/${id}`}><h4>{title}</h4></Link>
              </div>
            );
          })
        }
      </div>
    );
  }
}
