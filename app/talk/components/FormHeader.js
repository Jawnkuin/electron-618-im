import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import styles from './FormHeader.less';
import dummyImage from '../../utils/dummyimage';
import { closeCurrentWindow, minimizeCurrentWindow } from '../../share/rendererWindow';

const FormHeader = ({ buddyInfo, closeSingleTalk }) => {
  const info = buddyInfo.buddyInfo;
  return (
    <div className={styles.headerContainer}>
      <div className={styles.title}>
        <img src={dummyImage(info.userNickName, 1)} alt="LOGO" />
        <div className={styles.nameBox}>
          <p>{info.userNickName}</p>
        </div>
      </div>
      <div className={styles.btnGroup}>
        <button
          onClick={() => { minimizeCurrentWindow(); }}
          className={styles.fontBtn}
        >
          <Icon type="minus" />
        </button>
        <button className={styles.fontBtn}>
          <Icon type="scan" />
        </button>
        <button
          className={styles.fontBtn}
          onClick={() => {
            closeSingleTalk(info);
            closeCurrentWindow();
          }}
        >
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
  }).isRequired,
  closeSingleTalk: PropTypes.func.isRequired
};

export default FormHeader;
