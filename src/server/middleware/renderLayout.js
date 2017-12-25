import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

import configureStore from 'app/flux/store';
import loadBranchData from 'shared/utils/loadBranchData';
import App from 'app/components/App';

const html = (markup, state, assets, helmet) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0">
        <link rel="shortcut icon" href="/favicon.ico">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="stylesheet" href="/assets/app.css">
      </head>
      <body>
        <div id="app">${markup}</div>
        <script>
          window.__INITIAL_STATE__ = ${serialize(state)}
        </script>
        <script src="/assets/app.js"></script>
      </body>
    </html>
  `;
};

const render = location => {
  const store = configureStore();

  return loadBranchData(store, location).then(data => {
    console.log(data);

    const context = {};
    const markup = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );
    const state = store.getState();
    const helmet = Helmet.rewind();

    const { url, status = 200 } = context;

    if (url) {
      return { status: status || 301, redirect: url };
    }

    // TODO: handle assets
    const body = html(markup, state, null, helmet);

    return { status, body };
  });
};

export default () => {
  return async (req, res, next) => {
    try {
      const { status, redirect, body } = await render(req.url);

      res.status(status);

      if (redirect) {
        res.redirect(redirect);
      } else {
        res.send(body);
      }
    } catch (err) {
      next(err);
    }
  };
};
