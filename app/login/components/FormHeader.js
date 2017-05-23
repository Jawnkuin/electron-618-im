import React from 'react';
import { Icon } from 'antd';
import styles from './FormHeader.less';
import { closeCurrentWindow, minimizeCurrentWindow } from '../../share/rendererWindow';

const FormHeader = () => (
  <div className={styles.headerContainer}>
    <button className={styles.fontBtn}>
      <Icon type="caret-down" />
    </button>
    <button
      onClick={() => { minimizeCurrentWindow(); }}
      className={styles.fontBtn}
    >
      <Icon type="minus" />
    </button>
    <button className={styles.fontBtn} onClick={() => { closeCurrentWindow(); }}>
      <Icon type="close" />
    </button>
  </div>
);

export default FormHeader;
