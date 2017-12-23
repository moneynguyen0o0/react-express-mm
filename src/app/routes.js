import {
  Home,
  Images,
  NotFound
} from 'app/containers';

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/images',
    component: Images
  },
  {
    component: NotFound
  }
];
