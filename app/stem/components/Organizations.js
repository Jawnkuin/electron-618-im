import React, { Component } from 'react';
import { Tree } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './Organizations.less';
import Department from '../../share/classes/Department';
import dummyImage from '../../utils/dummyimage';

const TreeNode = Tree.TreeNode;

/*
* uint64 has difference stucture in regards to the enviroment.
* In development/production enviroment，it will be a {high,low,unsigned}
* On windows it will be symply a number
* Use `Number.MAX_SAFE_INTEGER` to check
**/


const appendBuddyToOrg = (deptTree, userList) => {
  const newDeptTree = _.cloneDeep(deptTree);
  const leafDepts = newDeptTree.getLeafDescendants();
  leafDepts.forEach((node) => {
    userList.forEach((user) => {
      if (_.isEqual(user.departmentId, node.deptId)) {
        if (!node.members) {
          node.members = [];
        }
        const index = _.findIndex(node.members, m => _.isEqual(m.userId, user.userId));
        if (index < 0) { node.members.push(user); }
      }
    });
    if (node.members && node.members.length) {
      node.members.sort((a, b) => a.priority >= b.priority);
    }
  });
  return newDeptTree;
};

// 主面板组织列表
class Organizations extends Component {
  // 类型设置
  static propTypes = {
    allUsersInfo: PropTypes.shape({
      deptListInfo: PropTypes.array,
      userListInfo: PropTypes.object
    }).isRequired,
    openSingleTalk: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props);
    this.state = {
      expandedKeys: [],
      deptTree: {},
      deptTreeWithBuddys: {}
    };

    const { allUsersInfo } = props;

    if (allUsersInfo.deptListInfo) {
      this.state.deptTree = Department.getDeptTree(allUsersInfo.deptListInfo);
    }

    if (allUsersInfo.userListInfo.userList) {
      const userList = allUsersInfo.userListInfo.userList;
      const newDeptTree = appendBuddyToOrg(this.state.deptTree, userList);
      this.state.deptTreeWithBuddys = newDeptTree;
    }


    this.onToggleExpand = this.onToggleExpand.bind(this);
    this.onToggleSelect = this.onToggleSelect.bind(this);
    this.getTreeNodes = this.getTreeNodes.bind(this);
  }


  componentWillReceiveProps (nextProps) {
    const { allUsersInfo } = nextProps;

    if (allUsersInfo.userListInfo.userList) {
      const userList = allUsersInfo.userListInfo.userList;
      const newDeptTree = appendBuddyToOrg(this.state.deptTree, userList);
      this.setState({ deptTreeWithBuddys: newDeptTree });
    }
  }

  onToggleExpand (expandedkeys) {
    this.setState({ expandedKeys: expandedkeys });
  }

  onToggleSelect (selectedKeys, e) {
    const key = e.node.props.eventKey;
    const newArray = Array.from(this.state.expandedKeys);
    const keyIndex = newArray.indexOf(key);
    if (keyIndex >= 0) {
      newArray.splice(keyIndex, 1);
    } else {
      newArray.push(key);
    }
    this.setState({ expandedKeys: newArray });
    console.log('expandedKeys', newArray);
  }

  // 递归函数生成树
  getTreeNodes = (node) => {
    // 没有子组织，下面只有具体成员
    if (node.members) {
      const key = node.deptId.low ? `${node.deptId.high}-${node.deptId.low}` : node.deptId;
      return (
        <TreeNode
          className={styles.BuddyItem}
          title={`${node.deptName} ${node.getMembersCount(m => m.onlineStatus === 1)}/${node.members.length}`}
          key={key}
        >
          {node.members.map(this.getTreeNodes)}
        </TreeNode>
      );
    }
    // 含有子组织
    if (node.children) {
      const key = node.deptId.low ? `${node.deptId.high}-${node.deptId.low}` : node.deptId;
      return (
        <TreeNode
          title={
            `${node.deptName} ${node.getMembersCount(m => m.onlineStatus === 1)}/${node.getMembersCount()}`
          } // ${node.online}/${node.total}
          key={key}
        >
          {node.children.map(this.getTreeNodes)}
        </TreeNode>
      );
    }
    // 渲染成员
    const key = node.userId.low ? `${node.userId.high}-${node.userId.low}` : node.userId;
    return (
      <TreeNode
        title={
          <div
            className={styles.MemberItem}
            onDoubleClick={() => { this.props.openSingleTalk(node); }}
          >
            <img
              src={dummyImage(node.userNickName, 1, undefined, node.onlineStatus === 2)}
              alt={node.userNickName}
            />
            <div className={styles.NameBox}>{node.userNickName}</div>
          </div>
        }
        key={key}
      />
    );
  };

  render () {
    return (
      <Tree
        className={styles.TreeNode}
        onSelect={this.onToggleSelect}
        onExpand={this.onToggleExpand}
        expandedKeys={this.state.expandedKeys}
      >
        {
          (this.state.deptTreeWithBuddys && this.state.deptTreeWithBuddys.children) &&
          this.state.deptTreeWithBuddys.children.map((node) => {
            const tree = this.getTreeNodes(node);
            return tree;
          })
        }
      </Tree>
    );
  }
}

export default Organizations;
