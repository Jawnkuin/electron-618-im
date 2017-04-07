import React from 'react';
import { Icon } from 'antd';
import styles from './FormHeader.less';

const FormHeader = () => (
  <div className={styles.headerContainer}>
    <button className={styles.fontBtn}>
      <Icon type="setting" />
    </button>
    <button className={styles.fontBtn}>
      <Icon type="minus" />
    </button>
    <button className={styles.fontBtn}>
      <Icon type="close" />
    </button>
  </div>
);

export default FormHeader;
