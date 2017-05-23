import React, { Component } from 'react';
import { Input, Icon, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './InputPanel.less';
import LinkBox from './LinkBox';
import doLogin from '../apis';

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

class InputPanel extends Component {
  static propTypes = {
    loginstate: PropTypes.shape({
      status: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired
    }).isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      psw: ''
    };
  }
  onChangeUserName = (e) => {
    this.setState({ name: e.target.value });
  }
  onChangeUserPsw = (e) => {
    this.setState({ psw: e.target.value });
  }
  checkLoading = () => this.props.loginstate.status === 'LOGINING'
  render () {
    return (
      <div
        className={styles.InputPanel}
        onKeyDown={(e) => {
          if (e.key && e.key === 'Enter') {
            e.preventDefault();
            doLogin(this.state.name, this.state.psw, new Date().getTime());
          }
        }}
      >
        <div className={styles.Avatar}>
          <img
            alt="Avatar"
            src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3943188969,2723503656&fm=58"
          />
        </div>
        <div className={styles.InputForm}>
          <Input
            id="account"
            suffix={<Icon type="caret-down" />}
            placeholder="请输入帐号"
            onChange={this.onChangeUserName}
          />
          <Input
            id="psw"
            type="password"
            suffix={<Icon type="layout" />}
            placeholder="请输入密码"
            onChange={this.onChangeUserPsw}
          />
          <div className={styles.CheckContainer}>
            <Checkbox onChange={onChange} >记住密码</Checkbox>
            <Checkbox onChange={onChange} >自动登录</Checkbox>
          </div>
          <Button
            className={styles.loginBtn}
            disabled={this.checkLoading()}
            loading={this.checkLoading()}
            onClick={() => doLogin(this.state.name, this.state.psw, new Date().getTime())}
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
