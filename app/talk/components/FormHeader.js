import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import styles from './FormHeader.less';
import dummyImage from '../../utils/dummyimage';

const FormHeader = ({ buddyInfo }) => {
  const info = buddyInfo.buddyInfo;
  return (
    <div className={styles.headerContainer}>
      <div className={styles.title}>
        <img src={dummyImage(info.userNickName)} alt="LOGO" />
        <div className={styles.nameBox}>
          <p>{info.userNickName}</p>
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
};


FormHeader.propTypes = {
  buddyInfo: PropTypes.shape({
    buddyInfo: PropTypes.shape({
      userId: PropTypes.object.isRequired
    }).isRequired
  }).isRequired
};

export default FormHeader;
