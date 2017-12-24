import {
  Home,
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
    path: '/about',
    component: About
  },
  {
    component: NotFound
  }
];
