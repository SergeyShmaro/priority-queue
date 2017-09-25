class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.left = null;
		this.right = null;
		this.parent = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			this.left.parent = this;
		} else {
			if (!this.right) {
				this.right = node;
				this.right.parent = this;
			}
		}
	}

	removeChild(node) {
		if (node === this.left) {
			this.left.parent = null;
			this.left = null;
		} else {
			if (node === this.right) {
				this.right.parent = null;
				this.right = null;
			} else {
				throw new Error("There is no such node");
			}
		}
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {
			let temp;
			if (this.parent.left) {
				if (this.parent.left === this) {
					if (this.left) {
						this.left.parent = this.parent;
					}

					if (this.right) {
						this.right.parent = this.parent;
					}

					temp = this.left;
					this.left = this.parent;
					this.parent.left = temp;

					if (this.parent.right) {
						this.parent.right.parent = this;
					}

					temp = this.right;
					this.right = this.parent.right;
					this.parent.right = temp;					

					if (this.parent.parent) {
						if (this.parent.parent.left === this.parent) {
							this.parent.parent.left = this;
						}
						if (this.parent.parent.right === this.parent) {
							this.parent.parent.right = this;
						}	
					}

					temp = this.parent.parent;
					this.parent.parent = this;
					this.parent = temp;
					
				} else {
					if (this.left) {
						this.left.parent = this.parent;
					}

					if (this.right) {
						this.right.parent = this.parent;
					}

					if (this.parent.left) {
						this.parent.left.parent = this;
					}

					temp = this.left;
					this.left = this.parent.left;
					this.parent.left = temp;

					temp = this.right;
					this.right = this.parent;
					this.parent.right = temp;					

					if (this.parent.parent) {
						if (this.parent.parent.left === this.parent) {
							this.parent.parent.left = this;
						}
						if (this.parent.parent.right === this.parent) {
							this.parent.parent.right = this;
						}	
					}

					temp = this.parent.parent;
					this.parent.parent = this;
					this.parent = temp;
				}
			} 
		}
	}
}

module.exports = Node;
