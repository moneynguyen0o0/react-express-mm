import React, { Component } from 'react';
import { array } from 'prop-types';
import { Link } from 'react-router-dom';

const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

export default class RelatedStories extends Component {
  static displayName = 'RelatedStories'

  static propTypes = {
    stories: array
  }

  render() {
    const { stories } = this.props;

    return (
      <div className="RelatedStories">
        {
          stories.map((blog, index) => {
            const {
              id,
              title
            } = blog;

            return (
              <div key={index}>
                <Link to={`/story/${id}/${slugify(title)}`}><h4>{title}</h4></Link>
              </div>
            );
          })
        }
      </div>
    );
  }
}
