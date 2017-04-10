import React from 'react';
import { Icon, Input, Button } from 'antd';
import styles from './InputPanel.less';

// 好友会话列表等等
export default () => (
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
    <div>
      <Button type="primary">
        关闭
      </Button>
      <Button type="primary">
        发送
      </Button>
    </div>
  </div>
);
