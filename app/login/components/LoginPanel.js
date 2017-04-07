import React from 'react';
import BasePanel from '../../share/BasePanel';
import FormHeader from './FormHeader';
import LogoContainer from './LogoContainer';
import InputForm from './InputForm';

export default () => (
  <BasePanel>
    <FormHeader />
    <LogoContainer />
    <InputForm />
  </BasePanel>
);
