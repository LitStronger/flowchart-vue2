class TreeNode {
  static nodeCount = 0;
  constructor(node_id, name) {
    this.node_id = node_id || this.nodeCount++;
    this.name = name || "";
    this.child_nodes = [];
  }
}

export default TreeNode;
