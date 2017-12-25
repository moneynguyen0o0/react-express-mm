import {
  Home,
  Posts,
  Post,
  About,
  NotFound
} from 'app/containers';

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/posts',
    component: Posts,
  },
  {
    path: '/story/:id/:slug',
    component: Post,
    exact: true
  },
  {
    path: '/about',
    component: About
  },
  {
    component: NotFound
  }
];
