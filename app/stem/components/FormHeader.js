import React from 'react';
import { Icon } from 'antd';
import styles from './FormHeader.less';

const FormHeader = () => (
  <div className={styles.headerContainer}>
    <div className={styles.title}>
      <img src="../../resources/icons/zbcg/16×16.png" alt="LOGO" />
      福建招标采购集团
    </div>
    <div className={styles.btnGroup}>
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
  </div>
);

export default FormHeader;
