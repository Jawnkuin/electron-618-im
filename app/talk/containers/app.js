import React from 'react';
import { Provider } from 'react-redux';
import TalkPanel from '../components/TalkPanel';


// eslint-disable-next-line react/prop-types
export default ({ store }) => (
  <Provider store={store}>
    <TalkPanel />
  </Provider>
);
