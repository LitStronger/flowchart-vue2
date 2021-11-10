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
    function bfs(node) {
      if (!node) return;
      if (node.nodeId === id) {
        result = node;
        return;
      }
      if (node.childNodes && node.childNodes.length) {
        for (let i = 0; i < node.childNodes.length; i++) {
          bfs(node.childNodes[i]);
        }
      }
    }
    this.tempNodeList.forEach((root) => {
      bfs(root); // 对各子树使用bfs搜索
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
    console.log("tmp", this.tempNodeList);
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
        fromNode.childNodes.push(toNode);
      }
    }
    console.log(this.tempNodeList);
  }
  // 连通各节点
  // refreshTree(fromId, toId, optType) {
  //   // 连线
  //   if (fromId && toId && optType === "connectLine") {
  //     let fromNode = this.getNodeById(fromId);
  //     let toNode = this.getNodeById(toId);
  //     fromNode.childNodes.push(toNode);
  //     for (let i = 0; i < this.tempNodeList.length; i++) {
  //       if (toNode.nodeId === this.tempNodeList[i].nodeId) {
  //       }
  //     }
  //   }
  //   // 删除连线
  //   else if (fromId && toId && optType === "deleteLine") {
  //     let fromNode = this.getNodeById(fromId);
  //     let toNode = this.getNodeById(toId);
  //     this.tempNodeList.forEach((root) => {
  //       if (fromNode && fromNode.childNodes && fromNode.childNodes.length)
  //         for (let i = 0; i < fromNode.childNodes.length; i++) {
  //           if (fromNode.childNodes[i].nodeId === toId) {
  //             fromNode.childNodes.splice(i, 1);
  //           }
  //         }
  //     });
  //     this.tempNodeList.push(toNode);
  //   }
  //   // 删除节点时
  //   else if (fromId && optType === "deleteNode") {
  //     this.tempNodeList.forEach((root) => {});
  //   }
  // }
}

export default FlowTree;
