import React from 'react';
import FormHeaderContainer from '../containers/FormHeaderContainer';
import DialogPanel from './DialogPanel';
import ProfilePanelContainer from '../containers/ProfilePanelContainer';
import styles from './TalkPanel.less';

export default () => (
  <div className={styles.TalkPanel}>
    <FormHeaderContainer />
    <div className={styles.FormContent}>
      <DialogPanel />
      <ProfilePanelContainer />
    </div>
  </div>
);
