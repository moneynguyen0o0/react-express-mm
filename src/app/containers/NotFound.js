import React from 'react';
import Status from 'app/components/errors/Status';

export default () => (
  <Status code={404}>
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  </Status>
);