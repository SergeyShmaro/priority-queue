const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this._size = 0;
	}

	push(data, priority) {
		const node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this._size++;
	}

	pop() {
		if (this.root) {
			this._size--;
			const data = this.root.data;
			this.restoreRootFromLastInsertedNode(this.detachRoot());
			this.shiftNodeDown(this.root);
			return data;
		}
	}

	detachRoot() {
		if (this.parentNodes.length) {
			const root = this.root;
			this.root = null;
			const indexOfRoot = this.parentNodes.indexOf(root);
			if (indexOfRoot !== -1) {
				this.parentNodes.splice(indexOfRoot, 1);
			}
			return root;
		}
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length) {
			this.root = this.parentNodes.pop();
			if (this.root === detached.left) {	
				this.root.left = null;
			} else {	
				this.root.left = detached.left;
				if (this.root.left) {
					this.root.left.parent = this.root;
				}
			}
			
			if (this.root === detached.right) {
				this.root.right = null;
			} else {
				this.root.right = detached.right;
				if (this.root.right) {
					this.root.right.parent = this.root;
				}
			}

			if (this.root.parent) {
				if (this.root.parent.right === this.root) {
					if (this.root.parent === detached) {
						this.parentNodes.unshift(this.root);
					} else {
						this.parentNodes.unshift(this.root.parent);
					}
				}
			}

			this.root.remove();
		}
	}

	size() {
		return this._size;
	}

	isEmpty() {
		if (this._size) {
			return false;
		}
		return true;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this._size = 0;
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;
			this.parentNodes.push(this.root);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].right) {
				this.parentNodes.shift();
			}
		}		
	}

	shiftNodeUp(node) {
		if (node.parent) {
			if (node.parent.priority < node.priority) {
				const indexOfNode = this.parentNodes.indexOf(node);
				const indexOfParent = this.parentNodes.indexOf(node.parent);
				if (indexOfNode !== -1 && indexOfParent !== -1) {
					const temp = this.parentNodes[indexOfNode];
					this.parentNodes[indexOfNode] = this.parentNodes[indexOfParent];
					this.parentNodes[indexOfParent] = temp;
				}
				if (indexOfNode !== -1 && indexOfParent === -1) {
					this.parentNodes[indexOfNode] = node.parent;
				}
				if (indexOfNode === -1 && indexOfParent !== -1) {
					this.parentNodes[indexOfParent] = node;
				}
				node.swapWithParent();				
				this.shiftNodeUp(node);
			}
		} else {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		if (node) {
			let maxPriority;
			if (node.left && node.right) {
				maxPriority = Math.max(node.left.priority, node.right.priority);
			} else {
				if (node.left) {
					maxPriority = node.left.priority;
				}
				if (node.right) {
					maxPriority = node.right.priority;
				}
				if (!node.left && !node.right) {
					maxPriority = null;
				}
			}
			if (maxPriority && maxPriority > node.priority) {

				let maxNodeChild = null;
				if (node.left && node.right) {
					if (maxPriority === node.left.priority) {
						maxNodeChild = node.left;
					} else {
						maxNodeChild = node.right;
					}
				}
				if (node.left && !node.right) {
					maxNodeChild = node.left;
				}
				if (node.right && !node.left) {
					maxNodeChild = node.right;
				}

				if (!node.parent) {
					this.root = maxNodeChild;
				}


				const indexOfNode = this.parentNodes.indexOf(node);
				const indexOfMax = this.parentNodes.indexOf(maxNodeChild);
				if (indexOfNode !== -1 && indexOfMax !== -1) {
					const temp = this.parentNodes[indexOfNode];
					this.parentNodes[indexOfNode] = this.parentNodes[indexOfMax];
					this.parentNodes[indexOfMax] = temp;
				}
				if (indexOfNode !== -1 && indexOfMax === -1) {
					this.parentNodes[indexOfNode] = maxNodeChild;
				}
				if (indexOfNode === -1 && indexOfMax !== -1) {
					this.parentNodes[indexOfMax] = node;
				}

				maxNodeChild.swapWithParent();
				this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;
