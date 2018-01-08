import { createSelector } from 'reselect';

const getStatus = state => state.post.isWaiting;

const getPost = (state, { match }) => {
  const post = state.post.post;

  return post.id == match.params.id ? post : null;
};

export const getFilteredPost = createSelector(
  [getStatus, getPost],
  (isWaiting, post) => {
    return !isWaiting ? post : null;
  }
);

// Sharing Selectors with Props Across Multiple Component Instances
export const makeGetFilteredPost = () => getFilteredPost;
