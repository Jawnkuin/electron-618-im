import React, { Component } from 'react';
import { Tree } from 'antd';
import PropTypes from 'prop-types';
import styles from './Organizations.less';
import Department from '../../share/classes/Department';
import dummyImage from '../../utils/dummyimage';
import { getAllUsers, getDeptList } from '../apis';

const TreeNode = Tree.TreeNode;


// 递归函数生成树
const getTreeNodes = (node) => {
  // 含有子组织
  if (node.children) {
    return (
      <TreeNode
        title={`${node.deptName} `} // ${node.online}/${node.total}
        key={`${node.deptId.high}-${node.deptId.low}`}
      >
        {node.children.map(getTreeNodes)}
      </TreeNode>
    );
  }
  // 没有子组织，下面只有具体成员
  if (node.members) {
    return (
      <TreeNode
        className={styles.BuddyItem}
        title={`${node.deptName} ${node.online}/${node.total}`}
        key={`${node.deptId.high}-${node.deptId.low}`}
      >
        {node.members.map(getTreeNodes)}
      </TreeNode>
    );
  }

  // 渲染成员
  return (
    <TreeNode
      title={
        <div className={styles.MemberItem}>
          <img src={dummyImage(node.name.slice(0, 1))} alt={node.name} />
          <div className={styles.NameBox}>{node.name}</div>
        </div>
      }
      key={node.id}
    />
  );
};

// 主面板组织列表
class Organizations extends Component {
  static propTypes = {
    userInfo: PropTypes.shape({
      userInfo: PropTypes.object
    }).isRequired,
    allUsersInfo: PropTypes.shape({
      deptListInfo: PropTypes.object,
      userListInfo: PropTypes.object
    }).isRequired
  }
  constructor (props) {
    super(props);
    this.state = {
      deptTree: {}
    };
  }
  componentDidMount () {
    console.log('componentDidMount', this.props);
    const { userInfo } = this.props;
    // getAllUsers(userInfo.userInfo.userId, 0);
    getDeptList(userInfo.userInfo.userId, 0);
  }

  componentWillReceiveProps (nextProps) {
    const { allUsersInfo } = nextProps;
    if (allUsersInfo && allUsersInfo.deptListInfo && allUsersInfo.deptListInfo.deptList) {
      const deptTree = Department.getDeptTree(allUsersInfo.deptListInfo.deptList);
      console.log(deptTree);
      this.setState({ deptTree });
    }
  }

  componentDidUpdate () {
    console.log('componentDidUpdate', this.props);
  }
  render () {
    return (
      <Tree
        className={styles.TreeNode}
      >
        {
          (this.state.deptTree && this.state.deptTree.children) &&
          this.state.deptTree.children.map(node => getTreeNodes(node))
        }
      </Tree>
    );
  }
}


export default Organizations;
