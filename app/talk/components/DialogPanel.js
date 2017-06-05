import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DlgItem from './DlgItem';
import { generateKeyString } from '../../utils/uint64';
import InputPanelContainer from '../containers/InputPanelContainer';
import ViewMore from './ViewMore';

import styles from './DialogPanel.less';


class DialogPanel extends Component {
  static propTypes = {
    dlgInfo: PropTypes.shape({
      msgList: PropTypes.arrayOf(PropTypes.shape({
        msg: PropTypes.string
      })).isRequired,
      hasHistory: PropTypes.bool.isRequired
    }).isRequired,
    buddyInfo: PropTypes.shape({
      buddyInfo: PropTypes.object.isRequired,
      selfInfo: PropTypes.object.isRequired
    }).isRequired,
    sendMessageReadAck: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      mouseDown: false
    };
  }

  componentDidMount () {
    if (!this.state.mouseDown) {
      this.dlgListView && this.dlgListView.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }

  shouldComponentUpdate (nextProps) {
    if (_.isEqual(this.props, nextProps)) {
      return false;
    }
    return true;
  }

  componentDidUpdate () {
    if (!this.state.mouseDown) {
      this.dlgListView && this.dlgListView.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }

  render () {
    const { msgList, hasHistory } = this.props.dlgInfo;
    const { selfInfo, buddyInfo } = this.props.buddyInfo;
    const sendMessageReadAck = this.props.sendMessageReadAck;
    const onlineStatus = buddyInfo.onlineStatus;

    return (
      <div className={styles.DialogPanel}>
        <div
          className={styles.DlgListView}
          onMouseDown={() => { this.setState({ mouseDown: true }); }}
          onMouseUp={() => { this.setState({ mouseDown: false }); }}
        >
          <ViewMore
            sessionId={buddyInfo.userId}
            endId={msgList.length > 0 ? msgList[0].msgId : 0}
            hasHistory={hasHistory}
          />
          {
            msgList.map((dlg, idx) => {
              const utf8Buf = Buffer.from(dlg.msgData, 'base64');
              // console.log(utf8Buf.toString('base64').toString('base64'));
              let msgStr = '';
              try {
                msgStr = utf8Buf.toString('utf8');
              } catch (e) {
                console.warn(e.message);
                msgStr = '';
              }

              const isFromSelf = _.isEqual(dlg.fromUserId, selfInfo.userId);
              return (
                <div
                  key={
                    `${generateKeyString(dlg.msgId)}${generateKeyString(dlg.fromUserId)}`}
                  ref={(dlgListView) => { this.dlgListView = (idx === msgList.length - 1) ? dlgListView : null; }}
                >
                  <DlgItem
                    name={
                      isFromSelf ? selfInfo.userNickName : buddyInfo.userNickName
                    }
                    time={dlg.createTime}
                    msg={msgStr}
                    isLeft={!isFromSelf}
                    isReadAck={dlg.readAck}
                    sendReadAck={() => { sendMessageReadAck(dlg.fromUserId, dlg.msgId); }}
                    onlineStatus={onlineStatus}
                  />
                </div>

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
