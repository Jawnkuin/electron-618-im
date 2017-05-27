import React from 'react';
import BasePanel from '../../share/BasePanel';
import FormHeader from './FormHeader';
import StemProfileContainer from '../containers/StemProfileContainer';
import BuddyWrapper from './BuddyWrapper';

export default () => (
  <BasePanel>
    <div>
      <FormHeader />
      <StemProfileContainer />
    </div>
    <BuddyWrapper />
  </BasePanel>
);
