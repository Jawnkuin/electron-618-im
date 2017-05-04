import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DlgItem from './DlgItem';
import { generateKeyString } from '../../utils/uint64';
import InputPanelContainer from '../containers/InputPanelContainer';

import styles from './DialogPanel.less';


class DialogPanel extends Component {
  static propTypes = {
    dlgInfo: PropTypes.shape({
      msgList: PropTypes.arrayOf(PropTypes.shape({
        msg: PropTypes.string
      })).isRequired
    }).isRequired,
    buddyInfo: PropTypes.shape({
      buddyInfo: PropTypes.object.isRequired,
      selfInfo: PropTypes.object.isRequired
    }).isRequired,
    sendMessageReadAck: PropTypes.func.isRequired
  };

  render () {
    const { msgList } = this.props.dlgInfo;
    const { selfInfo, buddyInfo } = this.props.buddyInfo;
    const sendMessageReadAck = this.props.sendMessageReadAck;

    return (
      <div className={styles.DialogPanel}>
        <div className={styles.DlgListView} >
          {
            msgList.map((dlg) => {
              const utf8Buf = Buffer.from(dlg.msgData, 'base64');
              const msgStr = utf8Buf.toString('utf8');
              const isFromSelf = _.isEqual(dlg.fromUserId, selfInfo.userId);
              if (!isFromSelf && !dlg.readAck) {
                sendMessageReadAck(dlg.fromUserId, dlg.msgId);
              }
              return (
                <DlgItem
                  key={
                    `${generateKeyString(dlg.msgId)}${generateKeyString(dlg.fromUserId)}`}
                  name={
                    isFromSelf ? selfInfo.userNickName : buddyInfo.userNickName
                  }
                  time={dlg.createTime}
                  msg={msgStr}
                  isLeft={!isFromSelf}
                />
              );
            }
            )
          }
        </div>
        <div className={styles.DlgInputView}>
          <InputPanelContainer />
        </div>
      </div>
    );
  }
}


export default DialogPanel;
