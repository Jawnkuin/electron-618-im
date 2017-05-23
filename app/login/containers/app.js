import React from 'react';
import { Provider } from 'react-redux';
import LoginPanel from '../components/LoginPanel';
import FormHeader from '../components/FormHeader';
import InputFormContainer from './InputFormContainer';

const App = () => (
  <LoginPanel>
    <FormHeader />
    <InputFormContainer />
  </LoginPanel>
);

// eslint-disable-next-line react/prop-types
export default ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);
