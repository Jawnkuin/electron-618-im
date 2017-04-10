import React from 'react';
import FormHeader from './FormHeader';
import DialogPanel from './DialogPanel';
import ProfilePanel from './ProfilePanel';
import styles from './TalkPanel.less';

export default () => (
  <div className={styles.TalkPanel}>
    <FormHeader />
    <div className={styles.FormContent}>
      <DialogPanel />
      <ProfilePanel />
    </div>
  </div>
);
