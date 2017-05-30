import React, { Component } from 'react';
import { Input, Icon, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './InputPanel.less';
import LinkBox from './LinkBox';
import UserItem from './UserItem';
import dummyimage from '../../utils/dummyimage';


const defaultAvatar = 'http://www.youlanw.com/static/images/man.jpg';


class InputPanel extends Component {
  static propTypes = {
    loginstate: PropTypes.shape({
      status: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
      users: PropTypes.array.isRequired
    }).isRequired,
    tryLoginAction: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      psw: '',
      rememberPsw: false,
      autoLogin: false,
      avatar: defaultAvatar,
      userListShow: false
    };
  }

  componentWillReceiveProps (nextProps) {
    const { loginstate } = nextProps;
    const userNum = loginstate.users.length;
    if (userNum > 0 && !this.state.name) {
      const lastUser = loginstate.users[userNum - 1];
      this.mapUsertoState(lastUser);
    }
  }

  // 将用户信息显示出来
  mapUsertoState = (user, extraStates) => {
    this.setState({
      name: user.name,
      psw: user.remember ? user.psw : '',
      rememberPsw: user.remember,
      autoLogin: user.autoLogin,
      avatar: user.avatarUrl ? user.avatarUrl : dummyimage(user.nickName, null, 50),
      ...extraStates
    });
  }

  // 密码输入框变化
  onChangeRememberPsw = (e) => {
    this.setState({ rememberPsw: e.target.checked });
  }

  // Id输入框变化
  onNameChange = (e) => {
    const { loginstate } = this.props;
    if (loginstate && loginstate.users && loginstate.users.length > 0) {
      const nameIdx = loginstate.users.map(u => u.name).indexOf(e.target.value);
      if (nameIdx >= 0) {
        this.mapUsertoState(loginstate.users[nameIdx]);
      } else {
        this.setState({ name: e.target.value });
      }
    }
  }

  // 自动登录变化
  onChangeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
      rememberPsw: e.target.checked ? e.target.checked : this.state.rememberPsw
    });
  }

  // 是否在登陆中
  checkLoading = () => this.props.loginstate.status === 'LOGINING'

  // 打开或者关闭用户列表
  toggleUserList = () => {
    this.setState({ userListShow: !this.state.userListShow });
  }

  onUserSelected = (user) => {
    console.log(this.state);
    this.mapUsertoState(user, { userListShow: false });
  }
  render () {
    const { tryLoginAction, loginstate } = this.props;
    let userCandidates = [];
    if (loginstate && loginstate.users) {
      userCandidates = loginstate.users;
    }
    const userListShow = this.state.userListShow;
    console.log('render called');
    return (
      <div
        className={styles.InputPanel}
        onKeyDown={(e) => {
          if (e.key && e.key === 'Enter') {
            e.preventDefault();
            tryLoginAction({
              name: this.state.name,
              psw: this.state.psw,
              remember: this.state.rememberPsw,
              autoLogin: this.state.autoLogin
            });
          }
        }}
      >
        <div className={styles.Avatar}>
          <img
            alt="Avatar"
            src={this.state.avatar}
          />
        </div>
        <div className={styles.InputForm}>
          <Input
            id="account"
            value={this.state.name}
            suffix={<Icon type="caret-down" onClick={this.toggleUserList} />}
            placeholder="请输入帐号"
            onChange={this.onNameChange}
          />
          {userListShow && (
            <div className={styles.UserItemList}>
              {
                userCandidates.map(e =>
                  (<UserItem
                    key={e.name}
                    user={e}
                    selectHandler={() => { this.onUserSelected(e); }}
                  />)
                )
              }
            </div>
          )}

          <Input
            id="psw"
            type="password"
            suffix={<Icon type="layout" />}
            placeholder="请输入密码"
            value={this.state.psw}
            onChange={(e) => { this.setState({ psw: e.target.value }); }}
          />
          <div className={styles.CheckContainer}>
            <Checkbox
              onChange={this.onChangeRememberPsw}
              checked={this.state.rememberPsw}
            >
              记住密码
            </Checkbox>
            <Checkbox
              onChange={this.onChangeAutoLogin}
              checked={this.state.autoLogin}
            >
              自动登录
            </Checkbox>
          </div>
          <Button
            className={styles.loginBtn}
            disabled={this.checkLoading()}
            loading={this.checkLoading()}
            onClick={() => tryLoginAction({
              name: this.state.name,
              psw: this.state.psw,
              remember: this.state.rememberPsw,
              autoLogin: this.state.autoLogin
            })
          }
          >
            登&nbsp;&nbsp;录
          </Button>
          {
            this.props.loginstate.error ?
            (<div className={styles.ErrorMessage}>
              <Icon type="exclamation-circle" />
              {` ${this.props.loginstate.error}`}
            </div>)
             : ''
           }
        </div>
        <LinkBox />
      </div>
    );
  }
}


export default InputPanel;
