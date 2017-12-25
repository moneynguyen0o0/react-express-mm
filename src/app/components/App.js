import React, { Component } from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import loadBranchData from 'shared/utils/loadBranchData';
import routes from 'app/routes';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
class App extends Component {
  static displayName = 'App'

  static contextTypes = {
    store: object
  }

  static propTypes = {
    location: object.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps;
    const navigated = location !== this.props.location;

    console.log(location, this.props.location);
    console.log(navigated);

    if (navigated) {
      const { store } = this.context;
      const { pathname } = location;

      loadBranchData(store, pathname);
    }
  }

  render() {
    return renderRoutes(routes);
  }
}

export default withRouter(App);
