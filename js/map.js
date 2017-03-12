function Map (cols, rows) {
	this.nodes = [];
	let y = 0;
	let xPos = 0;
	
	let total = cols * rows;

	console.time("Array initialize");
	for(let i = total; --i >= 0;) { 
		this.addNode(xPos, y, '.', '#00ff00', 'Room ' + xPos + ':' + y);
	
		if(xPos !== cols-1) {
			xPos++;
		}
		else {
			xPos = 0;
			if(y !== rows) {
				y++;
			}

		}
	}
}
Map.prototype.addNode = function (x, y, ascii = '.', color = '#00ff00', name = 'Torrent', area = 'Forest of Something', sight = 'This is the kitchen of a pretty house. The larder is to your left. The sitting room is to your right, the pantry to the south and the hallway is behind you to the north.', sound = 'This is the kitchen of a pretty house. The larder is to your left. The sitting room is to your right, the pantry to the south and the hallway is behind you to the north.', smell = 'This is the kitchen of a pretty house. The larder is to your left. The sitting room is to your right, the pantry to the south and the hallway is behind you to the north.') {
	this.nodes[this.nodes.length] = 
	{
		node: 
		{
			x: x, 
			y:y, 
			attributes: {
				'ascii': ascii, 
				'ascii-color': color, 
				'room-name': name, 
				'area': area,
				'sight': sight, 
				'sound': sound, 
				'smell': smell,
				'elevation': 0
			}
		}
	};
}
Map.prototype.getNode = function (point) {
	for(i=0;i!=this.nodes.length;i++) {
		if(point.x == this.nodes[i].node.x && point.y == this.nodes[i].node.y) {
			return this.nodes[i].node;
		}
	}
}
Map.prototype.setNode = function (x, y, attribute, value) {
	for(i=0;i!=this.nodes.length;i++) {
		if(x == this.nodes[i].node.x && y == this.nodes[i].node.y) {
			this.nodes[i].node.attributes[attribute] = value;
		}
	}
}
Map.prototype.getExits = function (node) {
	let exits = {north: '', east: '', west: '', south: ''}

	if(this.getNode( {x: node.x, y: node.y-1} )) // north
		exits.north = this.getNode( {x: node.x, y: node.y-1} );
	if(this.getNode( {x: node.x+1, y: node.y} )) // east
		exits.east = this.getNode( {x: node.x+1, y: node.y} );
	if(this.getNode( {x: node.x-1, y: node.y} )) //west
		exits.west = this.getNode( {x: node.x-1, y: node.y} );
	if(this.getNode( {x: node.x, y: node.y+1} )) // south
		exits.south = this.getNode( {x: node.x, y: node.y+1} );
		
	return exits;
}