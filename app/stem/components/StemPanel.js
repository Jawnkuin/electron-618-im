import React from 'react';
import BasePanel from '../../share/BasePanel';
import FormHeader from './FormHeader';
import StemProfileContainer from '../containers/StemProfileContainer';
import BuddyContainer from './BuddyContainer';

export default () => (
  <BasePanel>
    <div>
      <FormHeader />
      <StemProfileContainer />
    </div>
    <BuddyContainer />
  </BasePanel>
);
