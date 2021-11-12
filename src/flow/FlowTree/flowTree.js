import TreeNode from "./treeNode";
class FlowTree {
  constructor(graphType = "1") {
    this.graphId = new Date().getTime();
    this.graphType = graphType; // 1流程图  2状态转移
    this.nodes = null;
    this.tempNodeList = []; // 临时存放不连续的节点
    this.tempEdgeList = [];
  }

  getNodeById(id) {
    let result = null;
    function dfs(node) {
      if (!node) return;
      if (node.node_id === id) {
        result = node;
        return;
      }
      if (node.child_nodes && node.child_nodes.length) {
        for (let i = 0; i < node.child_nodes.length; i++) {
          dfs(node.child_nodes[i]);
        }
      }
    }
    this.tempNodeList.forEach((root) => {
      dfs(root); // 对各子树使用dfs搜索
    });

    return result;
  }

  init(nodeList, edgeList) {
    nodeList.forEach((e) => {
      let id = e.id;
      let text = e.data && e.data.style && e.data.style.text;
      let node = new TreeNode(id, text);
      this.tempNodeList.push(node);
    });
    this.tempEdgeList = edgeList;
    this.graphType = this.judgeGraphType(nodeList);
    // console.log("tmp", this.tempNodeList, this.tempEdgeList);
  }

  // 依次加入各边，得出以各个node作为顶点的树，取最深的一颗
  createTree() {
    if (this.tempNodeList.length > 1) {
      for (let i = 0; i < this.tempEdgeList.length; i++) {
        let e = this.tempEdgeList[i];
        let fromId = e.fromNode.id;
        let toId = e.toNode.id;
        let fromNode = this.getNodeById(fromId);
        let toNode = this.getNodeById(toId);
        fromNode.child_nodes.push(toNode);
      }
    }
    console.log("calc", this.tempNodeList);
    return this.getRoot();
  }

  getRoot() {
    let maxLen = 0;
    let root = null;

    this.tempNodeList.forEach((e) => {
      let len = this.getLength(e);
      if (len > maxLen) {
        maxLen = len;
        root = e;
      }
    });
    console.log("res", root);
    return root;
  }
  // 获取树的高度
  getLength(root) {
    let maxLen = 0;

    // map解决循环引用
    function dfs(node, len = 0, m = new Map()) {
      if (!node) return;

      // 成环
      if (m.has(node)) {
        maxLen = Math.max(maxLen, len);
        console.log("成环");
        return;
      }
      m.set(node, node);

      if (node.child_nodes && !node.child_nodes.length) {
        maxLen = Math.max(maxLen, len);
        return;
      }
      if (node.child_nodes && node.child_nodes.length) {
        for (let i = 0; i < node.child_nodes.length; i++) {
          dfs(node.child_nodes[i], len + 1, m);
        }
      }
    }
    dfs(root);
    return maxLen;
  }
  // 判断图类型，带菱形if框判定为流程图  1流程图  2状态转移 -1unkown
  judgeGraphType(nodeList) {
    if (nodeList && nodeList.length) {
      nodeList.forEach((node) => {
        if (node.type === "diamond") {
          return 1;
        }
      });
      return 2;
    }
    return -1;
  }
}

export default FlowTree;
