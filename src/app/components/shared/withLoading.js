import _ from 'lodash';
import React, { Component } from 'react';
import Spinner from 'app/components/icons/Spinner';

export default (loadingProp) => (WrappedComponent) => {
  return class LoadingHOC extends Component {
    static displayName = 'LoadingHOC'

    render() {
      return _.isEmpty(this.props[loadingProp]) ? <Spinner /> : <WrappedComponent {...this.props} />;
    }
  }
}
