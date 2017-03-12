window.onresize = function() {
	let canvas = document.getElementById('map-canvas');
	// Make it visually fill the positioned parent
	canvas.style.width ='100%';
	canvas.style.height='100%';
	// set the internal size to match
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	screen.render(map);
	
	if(selectedNode) {
		let canvas = document.getElementById('map-canvas');
		let ctx = canvas.getContext('2d');
		if(selectedNode != '') {
			let width = ctx.measureText(map.getNode(selectedNode).attributes.ascii).width;
			ctx.fillStyle = 'rgba(255,0,0,.5)';
			ctx.fillRect(15 + ((selectedNode.x * width) + (selectedNode.x * 10)), 15 + (selectedNode.y * 30), width + 10, 30);
		}
	}
} 