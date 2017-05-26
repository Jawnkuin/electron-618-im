import React, { Component } from 'react';
import { Input, Icon, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './InputPanel.less';
import LinkBox from './LinkBox';
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
      avatar: defaultAvatar
    };
  }

  componentWillReceiveProps (nextProps) {
    const { loginstate } = nextProps;
    const userNum = loginstate.users.length;
    if (userNum > 0 && !this.state.name) {
      const lastUser = loginstate.users[userNum - 1];
      this.setState({
        name: lastUser.name,
        psw: lastUser.remember ? lastUser.psw : '',
        rememberPsw: lastUser.remember,
        autoLogin: lastUser.autoLogin,
        avatar: lastUser.avatarUrl ? lastUser.avatarUrl : dummyimage(lastUser.nickName, null, 50)
      });
    }
  }

  onChangeRememberPsw = (e) => {
    this.setState({ rememberPsw: e.target.checked });
  }

  onNameChange = (e) => {
    const { loginstate } = this.props;
    let isSameName = false;
    let nickName = '';
    if (loginstate && loginstate.users && loginstate.users.length > 0) {
      const userNum = loginstate.users.length;
      const propName = loginstate.users[userNum - 1].name;
      isSameName = e.target.value === propName;
      if (isSameName) {
        nickName = loginstate.users[userNum - 1].nickName;
      }
    }
    this.setState({
      name: e.target.value,
      avatar: isSameName ? dummyimage(nickName, null, 50) : defaultAvatar
    });
  }

  onChangeAutoLogin = (e) => {
    if (e.target.checked) {
      this.setState({
        autoLogin: e.target.checked,
        rememberPsw: e.target.checked
      });
    } else {
      this.setState({
        autoLogin: e.target.checked
      });
    }
  }
  checkLoading = () => this.props.loginstate.status === 'LOGINING'
  render () {
    const { tryLoginAction } = this.props;
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
            suffix={<Icon type="caret-down" />}
            placeholder="请输入帐号"
            onChange={this.onNameChange}
          />
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
