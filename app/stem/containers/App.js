import React from 'react';
import { Provider } from 'react-redux';
import StemPanel from '../components/StemPanel';

const App = () => (
  <StemPanel />
);


// eslint-disable-next-line react/prop-types
export default ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);
