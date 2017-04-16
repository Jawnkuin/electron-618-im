import React from 'react';
import { Icon, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './InputPanel.less';
import { sendMessage } from '../apis';


// 好友会话列表等等
const InputPanel = ({ buddyInfo }) => {
  const info = buddyInfo.buddyInfo;
  return (
    <div className={styles.InputPanel}>
      <div className={styles.InputControl}>
        <div className={styles.InputControlBtnGroup}>
          <button className={styles.fontBtn}>
            <Icon type="smile-o" />
          </button>
          <button className={styles.fontBtn}>
            <Icon type="picture" />
          </button>
          <button className={styles.fontBtn}>
            <Icon type="folder" />
          </button>
        </div>
        <div>
          <button className={styles.fontBtn}>
            <Icon type="clock-circle" /> 消息记录
            </button>
        </div>
      </div>
      <div className={styles.InputArea}>
        <Input type="textarea" autosize />
      </div>
      <div className={styles.InputRooter}>
        <Button
          onClick={() => {
            const buf = Buffer.from('hahaha', 'utf8');
            sendMessage(info.userId, buf.toString('base64'));
          }} type="primary"
        >
            发送
          </Button>
        <Button type="primary">
            关闭
          </Button>
      </div>
    </div>
  );
};

InputPanel.propTypes = {
  buddyInfo: PropTypes.shape({
    userId: PropTypes.object.isRequired
  }).isRequired
};

export default InputPanel;
