import { createSelector } from 'reselect';

const getPost = state => state.post.post;
const getStatus = state => state.post.isWaiting

export const getFilteredPost = createSelector(
  [getStatus, getPost],
  (isWaiting, post) => {
    return !isWaiting ? post : null;
  }
);
