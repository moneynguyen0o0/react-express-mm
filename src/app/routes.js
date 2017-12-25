import Page from 'app/components/Page';
import BlogArticle from 'app/components/news/BlogArticle';
import {
  Home,
  Blogs,
  Blog,
  About,
  NotFound
} from 'app/containers';

export default [
  {
    component: Page,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/blogs',
        component: Blogs,
        routes: [
          {
            path: '/blogs/:id',
            component: BlogArticle,
            exact: true
          }
        ]
      },
      {
        path: '/story/:id/:slug',
        component: Blog,
        exact: true
      },
      {
        path: '/about',
        component: About
      },
      {
        component: NotFound
      }
    ]
  }
];
