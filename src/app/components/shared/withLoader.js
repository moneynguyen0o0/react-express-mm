import _ from 'lodash';
import React, { Component } from 'react';
import Spinner from 'app/components/icons/Spinner';

export default (loadingProp) => (WrappedComponent) => {
  return class LoaderHOC extends Component {
    static displayName = 'LoaderHOC'

    render() {
      return _.isEmpty(this.props[loadingProp]) ? <Spinner /> : <WrappedComponent {...this.props} />;
    }
  }
}