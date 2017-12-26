import React, { Component } from 'react';
import { array } from 'prop-types';
import { Link } from 'react-router-dom';
import { slugify } from 'app/utils/StringUtils';
import withLoading from 'app/components/shared/withLoading';

class ListPosts extends Component {
  static displayName = 'ListPosts'

  static propTypes = {
    posts: array
  }

  render() {
    const { posts } = this.props;

    return (
      <div className="ListPosts">
        {
          posts.map((post, index) => {
            const { id, title = '', body = '' } = post;

            return (
              <div key={index} className="ListPosts-item">
                <Link to={`/story/${id}/${slugify(title)}`}>
                  <h3 className="ListPosts-title">{title}</h3>
                </Link>
                <p className="ListPosts-abstract">{body}</p>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default withLoading('posts')(ListPosts);
