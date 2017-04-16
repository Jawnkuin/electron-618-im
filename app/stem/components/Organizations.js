import React, { Component } from 'react';
import { Tree } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './Organizations.less';
import Department from '../../share/classes/Department';
import dummyImage from '../../utils/dummyimage';
import { getAllUsers, getDeptList } from '../apis';

const TreeNode = Tree.TreeNode;


// 主面板组织列表
class Organizations extends Component {
  // 类型设置
  static propTypes = {
    userInfo: PropTypes.shape({
      userInfo: PropTypes.object
    }).isRequired,
    allUsersInfo: PropTypes.shape({
      deptListInfo: PropTypes.object,
      userListInfo: PropTypes.object
    }).isRequired,
    openSingleTalk: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props);
    this.state = {
      deptTree: {},
      appendedChildren: false
    };
  }

  componentDidMount () {
    const { userInfo } = this.props;
    // 获取部门列表
    getDeptList(userInfo.userInfo.userId, 0);
  }

  componentWillReceiveProps (nextProps) {
    const { allUsersInfo } = nextProps;
    // department tree含数据再做所有用户请求
    if (!this.state.deptTree.children && allUsersInfo.deptListInfo.deptList) {
      const deptTree = Department.getDeptTree(allUsersInfo.deptListInfo.deptList);
      this.setState({ deptTree });
      getAllUsers();
    }

    if (!this.state.appendedChildren && allUsersInfo.userListInfo.userList) {
      const userList = allUsersInfo.userListInfo.userList;
      const newDeptTree = this.state.deptTree;
      const leafDepts = newDeptTree.getLeafDescendants();
      leafDepts.forEach((node) => {
        userList.forEach((user) => {
          if (_.isEqual(user.departmentId, node.deptId)) {
            if (!node.members) {
              node.members = [];
            }
            if (node.members.indexOf(user) < 0) { node.members.push(user); }
          }
        });
      });
      this.setState({ deptTree: newDeptTree, appendedChildren: true });
    }
  }

  // 递归函数生成树
  getTreeNodes = (node) => {
    // 没有子组织，下面只有具体成员
    if (node.members) {
      return (
        <TreeNode
          className={styles.BuddyItem}
          title={`${node.deptName} 0/${node.members.length}`}
          key={`${node.deptId.high}-${node.deptId.low}`}
        >
          {node.members.map(this.getTreeNodes)}
        </TreeNode>
      );
    }
    // 含有子组织
    if (node.children) {
      return (
        <TreeNode
          title={`${node.deptName} `} // ${node.online}/${node.total}
          key={`${node.deptId.high}-${node.deptId.low}`}
        >
          {node.children.map(this.getTreeNodes)}
        </TreeNode>
      );
    }
    // 渲染成员
    return (
      <TreeNode
        title={
          <div
            className={styles.MemberItem}
            onDoubleClick={() => { this.props.openSingleTalk(node); }}
          >
            <img src={dummyImage(node.userNickName.slice(0, 1))} alt={node.userNickName} />
            <div className={styles.NameBox}>{node.userNickName}</div>
          </div>
        }
        key={`${node.userId.high}-${node.userId.low}`}
      />
    );
  };

  render () {
    return (
      <Tree
        className={styles.TreeNode}
      >
        {
          (this.state.deptTree && this.state.deptTree.children) &&
          this.state.deptTree.children.map(node => this.getTreeNodes(node))
        }
      </Tree>
    );
  }
}

export default Organizations;
