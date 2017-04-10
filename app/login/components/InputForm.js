import React from 'react';
import { Input, Icon, Checkbox, Button } from 'antd';
import { ipcRenderer } from 'electron';
import { doLogin } from '../actions';
import styles from './InputForm.less';

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

export default () => (
  <div className={styles.InputForm}>
    <Input id="account" prefix={<Icon type="user" />} placeholder="请输入帐号" />
    <Input id="psw" type="password" prefix={<Icon type="lock" />} placeholder="请输入密码" />
    <div className={styles.CheckContainer}>
      <Checkbox onChange={onChange} >记住密码</Checkbox>
      <Checkbox onChange={onChange} >自动登录</Checkbox>
    </div>
    <Button
      className={styles.loginBtn}
      onClick={() => ipcRenderer.send('redux-action', doLogin('吴建军'))}
    >
      登&nbsp;&nbsp;录
    </Button>
  </div>
);
