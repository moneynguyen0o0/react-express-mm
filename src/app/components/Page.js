import React, { Component } from 'react';
import { object } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Container } from 'reactstrap';
import Helmet from 'react-helmet';
import Header from 'app/components/core/Header';
import { title, meta } from 'config/assets';

import 'app/styles/app.css';

export default class Page extends Component {
  static displayName = 'Page'

  static propTypes = {
    route: object.isRequired
  }

  render() {
    const {
      route: {
        routes
      }
    } = this.props;

    return (
      <div className="Page">
        <Helmet title={title} meta={meta} />
        <Header />
        <div className="Main">
          <Container >
              <Switch>
                { renderRoutes(routes) }
              </Switch>
          </Container>
        </div>
      </div>
    );
  }
}
