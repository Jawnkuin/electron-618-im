import React from 'react';
import SearchBoxContainer from '../containers/SearchBoxContainer';
import './BuddyWrapper.less';
import BuddyPanelContainer from '../containers/BuddyPanelContainer';

export default () => (
  <div id="BuddyWrapper">
    <SearchBoxContainer />
    <BuddyPanelContainer />
  </div>
);
