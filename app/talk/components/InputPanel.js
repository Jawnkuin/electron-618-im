import React, { Component } from 'react';
import { Icon, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './InputPanel.less';
import { sendIpcMessage } from '../apis';


// 好友会话列表等等
class InputPanel extends Component {
  static propTypes = {
    buddyInfo: PropTypes.shape({
      buddyInfo: PropTypes.shape({
        userId: PropTypes.object.isRequired
      }).isRequired,
      selfInfo: PropTypes.shape({
        userId: PropTypes.object.isRequired
      }).isRequired
    }).isRequired,
    sendMessage: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  onChangeInput (e) {
    this.setState({ input: e.target.value });
  }

  render () {
    const toInfo = this.props.buddyInfo.buddyInfo;
    const fromInfo = this.props.buddyInfo.selfInfo;
    const sendMessage = this.props.sendMessage;

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
          <Input
            type="textarea"
            onChange={(e) => { this.onChangeInput(e); }}
            autosize
          />
        </div>
        <div className={styles.InputRooter}>
          <Button
            onClick={() => {
              if (!this.state.input) {
                return;
              }
              const buf = Buffer.from(this.state.input, 'utf8');
              // const base64String = buf.toString('base64');
              const sendTime = new Date().getTime();
              // 用于更改本线程内的状态,后期将electron-redux重写之后再合并
              sendMessage(fromInfo.userId, sendTime, buf);
              // 用于向服务器发消息
              sendIpcMessage(toInfo.userId, buf);
            }}
            type="primary"
          >
            {'发送'}
          </Button>
          <Button type="primary">
            {'关闭'}
          </Button>
        </div>
      </div>
    );
  }
}


export default InputPanel;
