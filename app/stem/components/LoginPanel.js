import React from 'react';
import BasePanel from '../../share/BasePanel';
import FormHeader from './FormHeader';
import StemProfile from './StemProfile';
import BuddyContainer from './BuddyContainer';

export default () => (
  <BasePanel>
    <FormHeader />
    <StemProfile />
    <BuddyContainer />
  </BasePanel>
);
