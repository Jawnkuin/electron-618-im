import React, { Component } from 'react';
import { Input, Icon, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './InputForm.less';

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

class InputForm extends Component {
  static propTypes = {
    loginstate: PropTypes.shape({
      status: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired
    }).isRequired,
    doLogin: PropTypes.func.isRequired
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
      <div className={styles.InputForm}>
        <Input
          id="account"
          prefix={<Icon type="user" />}
          placeholder="请输入帐号"
          onChange={this.onChangeUserName}
        />
        <Input
          id="psw"
          type="password"
          prefix={<Icon type="lock" />}
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
          onClick={() => this.props.doLogin(this.state.name, this.state.psw)}
        >
          登&nbsp;&nbsp;录
        </Button>
        <div className={styles.ErrorMessage}>
          {this.props.loginstate.error}
        </div>
      </div>
    );
  }
}


export default InputForm;
