import React, { Component } from 'react';
import { Icon, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './InputPanel.less';

import { closeCurrentWindow } from '../../share/rendererWindow';


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
    sendMessage: PropTypes.func.isRequired,
    closeSingleTalk: PropTypes.func.isRequired
  }


  constructor (props) {
    super(props);
    this.state = {
      input: '',
      msgId: 0
    };
  }

  onSendButtonClick () {
    const fromInfo = this.props.buddyInfo.selfInfo;
    const sendMessage = this.props.sendMessage;
    if (!this.state.input) {
      return;
    }
    const base64Str = btoa(this.state.input);
    const buf = Buffer.from(base64Str, 'utf8');
    // const base64String = buf.toString('base64');
    const sendTime = new Date().getTime();
    // 用于更改本线程内的状态,并向服务器发送消息
    sendMessage(fromInfo.userId, parseInt(sendTime / 1000, 10), buf, this.state.msgId);

    this.emitInputEmpty();
  }

  onChangeInput (e) {
    this.setState({ input: e.target.value });
  }

  emitInputEmpty () {
    this.contentInput.focus();
    this.setState({ input: '', msgId: this.state.msgId + 1 });
  }

  render () {
    return (
      <div
        className={styles.InputPanel}
        onKeyDown={(e) => {
          if (e.key && e.key === 'Enter') {
            e.preventDefault();
            this.onSendButtonClick();
          }
        }}
      >
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
            value={this.state.input}
            onChange={(e) => { this.onChangeInput(e); }}
            ref={(node) => { this.contentInput = node; }}
            autosize={{ minRows: 5 }}
          />
        </div>
        <div className={styles.InputRooter}>
          <Button
            onClick={() => {
              this.onSendButtonClick();
            }}
            type="primary"
          >
            {'发送'}
          </Button>
          <Button
            onClick={() => {
              this.props.closeSingleTalk(this.props.buddyInfo.buddyInfo);
              closeCurrentWindow();
            }}
            type="primary"
          >
            {'关闭'}
          </Button>
        </div>
      </div>
    );
  }
}


export default InputPanel;
