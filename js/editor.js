function Editor() {}
Editor.prototype.render = function(map) {
	let canvas = document.getElementById('map-canvas');
	// Make it visually fill the positioned parent
	canvas.style.width =size.width*26 + 15;
	canvas.style.height=size.height*30 + 15;
	// set the internal size to match
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	let ctx = canvas.getContext('2d');
	
	ctx.clearRect(0,0,canvas.width,canvas.height); // clear canvas
	ctx.fillStyle = 'rgba(255,255,255,1)';
	ctx.strokeStyle = 'rgba(255,255,255,1)';
	ctx.font="30px monospace";
	let color = null;
	
	for(let i = map.nodes.length; --i >= 0;) {
		let node = map.nodes[i].node;
		let width = ctx.measureText(node.attributes.ascii).width;

		if(color === null && color != node.attributes['ascii-color'])
			ctx.fillStyle = node.attributes['ascii-color'];
		ctx.fillText(node.attributes.ascii, 20 + (node.x * width) + (node.x * 10), 37 + (node.y * 30));
		ctx.strokeRect(15 + ((node.x * width) + (node.x * 10)), 15 + (node.y * 30), width + 10, 30);
	}
}
Editor.prototype.drawNode = function(nodeUsed, ctx) {
	ctx.fillStyle = 'rgba(255,255,255,1)';
	ctx.strokeStyle = 'rgba(255,255,255,1)';
	ctx.font="30px monospace";
	
	let node = map.getNode({x: nodeUsed.x, y: nodeUsed.y});
	let width = ctx.measureText(node.attributes.ascii).width;

	ctx.fillStyle = node.attributes['ascii-color'];
	ctx.fillText(node.attributes.ascii, 20 + (nodeUsed.x * width) + (nodeUsed.x * 10), 37 + (nodeUsed.y * 30));
	//ctx.strokeRect(15 + ((nodeUsed.x * width) + (nodeUsed.x * 10)), 15 + (nodeUsed.y * 30), width + 10, 30);
}
Editor.prototype.getMapCoord = function(e, canvas) {
	let ctx = canvas.getContext('2d');
	let width = ctx.measureText(map.getNode({ x: 0, y: 0 }).attributes.ascii).width;
	
	var rect = canvas.getBoundingClientRect();
	let xPos = e.clientX - rect.left;
	let yPos = e.clientY - rect.top;
	let xNode = (xPos - 15) / (width + 10);
	let yNode = (yPos - 15) / 30;
	
	coordinates = {x: parseInt(xNode), y: parseInt(yNode) };
	
	return coordinates;
}
Editor.prototype.keyPress = function(e, ctx) {
	var keynum;

	if(window.event) { // IE                    
	  keynum = e.keyCode;
	} else if(e.which){ // Netscape/Firefox/Opera                   
	  keynum = e.which;
	}
	
	console.log(selectedColor);
	map.setNode(selectedNode.x, selectedNode.y, "ascii", String.fromCharCode(keynum));
	map.setNode(hoveredNode.x, hoveredNode.y, "ascii-color", selectedColor);
	let width = ctx.measureText(map.getNode(selectedNode).attributes.ascii).width;
	
	for (var name in map.getNode(selectedNode).attributes) {
		let value = map.getNode(selectedNode).attributes[name];
		let selected = document.getElementById(name);
		if(selected) {
			if(selected.id == 'ascii') { selected.textContent = value }
			else if(selected.id == 'ascii-color') { selected.style.backgroundColor = value }
			else { selected.innerHTML = value; }
			let hovered = document.getElementById('hovered-' + name);
			hovered.innerHTML = value;
		}
	}
	
	ctx.clearRect(15 + ((selectedNode.x * width) + (selectedNode.x * 10)), 15 + (selectedNode.y * 30), width + 10, 30); // clear canvas

	this.drawNode(selectedNode, ctx, map);
	
	ctx.fillStyle = 'rgba(255,0,0,.5)';
	ctx.fillRect(15 + ((selectedNode.x * width) + (selectedNode.x * 10)), 15 + (selectedNode.y * 30), width + 10, 30);
}
Editor.prototype.keyUp = function(e, ctx) { 

}
Editor.prototype.mouseMove = function(e, canvas, ctx) {
	hoveredNode = this.getMapCoord(e, canvas);

	let coords = document.getElementById('output');
	coords.innerHTML = `X:${hoveredNode.x} - Y:${hoveredNode.y}`;

	if(selectedTool === 'pencil' && mouseDown) {
		let width = ctx.measureText(map.getNode(hoveredNode).attributes.ascii).width;
		map.setNode(hoveredNode.x, hoveredNode.y, "ascii", selectedAscii);
		map.setNode(hoveredNode.x, hoveredNode.y, "ascii-color", selectedColor);
		ctx.clearRect(15 + ((hoveredNode.x * width) + (hoveredNode.x * 10)), 15 + (hoveredNode.y * 30), width + 10, 30); // clear canvas

		this.drawNode(hoveredNode, ctx, map);
		
		let ele = document.getElementById('pencil-panel');
	}

	for (var name in map.getNode(hoveredNode).attributes) {
		let value = map.getNode(hoveredNode).attributes[name];
		let elem = document.getElementById('hovered-' + name);
		if(elem) {
			if(elem.id == 'hovered-ascii-color') {
				elem.value = value;
			}
			else {
				elem.innerHTML = value;
			}
		}
	}
}
Editor.prototype.click = function(e, ctx) {
	if(previousHoveredNode) {
		let width = ctx.measureText(map.getNode(previousHoveredNode).attributes.ascii).width;
		ctx.clearRect(15 + ((previousHoveredNode.x * width) + (previousHoveredNode.x * 10)), 15 + (previousHoveredNode.y * 30), width + 10, 30); // clear canvas
		this.drawNode(previousHoveredNode, ctx, map);
		previousHoveredNode = null;
	}
	
	selectedNode = this.getMapCoord(e, canvas);
	let width = ctx.measureText(map.getNode(selectedNode).attributes.ascii).width;

	for (var name in map.getNode(selectedNode).attributes) {
		let value = map.getNode(selectedNode).attributes[name];
		let elem = document.getElementById(name);
		if(elem) {
			elem.disabled = false;
			if(elem.id == 'ascii') { elem.textContent = value; }
			else if(elem.id == 'ascii-color') { elem.style.backgroundColor = value; }			
			else { elem.value = value; }
		}
	}
	
	ctx.clearRect(15 + ((selectedNode.x * width) + (selectedNode.x * 10)), 15 + (selectedNode.y * 30), width + 10, 30); // clear canvas

	this.drawNode(selectedNode, ctx, map);
	
	ctx.fillStyle = 'rgba(255,0,0,.5)';
	ctx.fillRect(15 + ((selectedNode.x * width) + (selectedNode.x * 10)), 15 + (selectedNode.y * 30), width + 10, 30);
	ctx.strokeRect(15 + ((selectedNode.x * width) + (selectedNode.x * 10)), 15 + (selectedNode.y * 30), width + 10, 30);
	
	previousHoveredNode = selectedNode;
}