import React from 'react';
import { Icon } from 'antd';
import styles from './FormHeader.less';
import dummyImage from '../../utils/dummyimage';

const FormHeader = () => (
  <div className={styles.headerContainer}>
    <div className={styles.title}>
      <img src={dummyImage('李四')} alt="LOGO" />
      <div className={styles.nameBox}>
        <p>{'李四'}</p>
      </div>
    </div>
    <div className={styles.btnGroup}>
      <button className={styles.fontBtn}>
        <Icon type="minus" />
      </button>
      <button className={styles.fontBtn}>
        <Icon type="scan" />
      </button>
      <button className={styles.fontBtn}>
        <Icon type="close" />
      </button>
    </div>
  </div>
);

export default FormHeader;
