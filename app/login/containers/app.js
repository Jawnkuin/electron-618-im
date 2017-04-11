import React from 'react';
import { Provider } from 'react-redux';
import BasePanel from '../../share/BasePanel';
import FormHeader from '../components/FormHeader';
import LogoBox from '../components/LogoBox';
import InputFormContainer from './InputFormContainer';

const App = () => (
  <BasePanel>
    <FormHeader />
    <LogoBox />
    <InputFormContainer />
  </BasePanel>
);

// eslint-disable-next-line react/prop-types
export default ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);
