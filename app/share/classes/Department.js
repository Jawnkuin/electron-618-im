import _ from 'lodash';

const dfs = (node, arr) => {
  if (node.children.length === 0) {
    arr.push(node);
  } else {
    node.children.map(n => dfs(n, arr));
  }
};

export default class Department {
  constructor ({ deptId, deptName, deptStatus, parentDeptId, priority }) {
    this.deptId = deptId;
    deptName && (this.deptName = deptName);
    deptStatus && (this.deptStatus = deptStatus);
    parentDeptId && (this.parentDeptId = parentDeptId);
    priority && (this.priority = priority);
    this.children = [];
  }

  getLeafDescendants () {
    const leafNodeList = [];
    dfs(this, leafNodeList);
    return leafNodeList;
  }

  // 递归获得树形结构
  static getDeptTree (DeptObjectList) {
    const cloneObjList = _.clone(DeptObjectList);

    const deptIds = cloneObjList.map(dpt => dpt.deptId);
    const parentDeptIds = cloneObjList.map(dpt => dpt.parentDeptId);

    // 虽然id是uint64但是在js里面会变成object，所以比较的时候需要用 *值比较*
    // 可考虑es6的新特性代替
    const rootIds = _.differenceWith(parentDeptIds, deptIds, _.isEqual);

    const virtualRoot = new Department({ deptId: rootIds[0] });

    const appendChildren = (parent, toPickList) => {
      if (toPickList.length === 0) { return; }

      const newList = [];
      toPickList.forEach((dpt) => {
        if (_.isEqual(parent.deptId, dpt.parentDeptId)) {
          const departObj = new Department(dpt);
          parent.children.push(departObj);
        } else {
          newList.push(dpt);
        }
      });
      parent.children.sort((a, b) => a.priority >= b.priority);
      parent.children.forEach(child => appendChildren(child, newList));
    };

    appendChildren(virtualRoot, cloneObjList);
    return virtualRoot;
  }
}
