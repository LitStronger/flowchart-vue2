class TreeNode {
  static nodeCount = 0;
  constructor(nodeId, name) {
    this.nodeId = nodeId || this.nodeCount++;
    this.name = name || "";
    this.childNodes = null;
  }
}

export default TreeNode;
