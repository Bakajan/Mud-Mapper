module.exports() = {
	nodes: [],
	getNode: function (x,y) {
		this.nodes.forEach( (elem) => {
			if(x == elem.x && y == elem.y) {
				return elem;
			}
		});
	}
}