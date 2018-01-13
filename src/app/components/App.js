import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Helmet from 'react-helmet';
import Header from 'app/components/core/Header';
import routes from 'app/routes';
import { title, meta } from 'config/assets';
import { Switch, Route } from 'react-router-dom';

import 'app/styles/app.css';

export default class App extends Component {
  static displayName = 'App'

  render() {
    return (
      <div className="App">
        <Helmet title={title} meta={meta} />
        <Header />
        <div className="Main">
          <Container >
            <Switch>
                {
                  routes.map((route, index) => (
                    <Route key={index} {...route} />
                  ))
                }
              </Switch>
          </Container>
        </div>
      </div>
    );
  }
}
