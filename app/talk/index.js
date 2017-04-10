import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/app';
import '../app.global.css';


render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/app', () => {
    const NextRoot = require('./containers/app'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
