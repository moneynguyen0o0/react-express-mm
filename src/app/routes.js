import {
  Home,
  ImageGIFs,
  NotFound
} from 'app/containers';

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/funny-images',
    component: ImageGIFs
  },
  {
    component: NotFound
  }
];
