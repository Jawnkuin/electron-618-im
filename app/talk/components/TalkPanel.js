import React from 'react';
import FormHeaderContainer from '../containers/FormHeaderContainer';
import DialogPanelContainer from '../containers/DialogPanelContainer';
import ProfilePanelContainer from '../containers/ProfilePanelContainer';
import styles from './TalkPanel.less';

export default () => (
  <div className={styles.TalkPanel}>
    <FormHeaderContainer />
    <div className={styles.FormContent}>
      <DialogPanelContainer />
      <ProfilePanelContainer />
    </div>
  </div>
);
