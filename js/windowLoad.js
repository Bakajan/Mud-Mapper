 window.onload = function() {
	actor = new Actor();
	map = new Map(size.width, size.height);
	let load = document.getElementById('load-window');
	load.style.display = 'none';
	nodeDrawer = new NodeDrawer(map);
	toolDrawer = new ToolDrawer();
	init();
	
	let mapPanel = document.getElementById('map-panel');
	mapPanel.addEventListener('click', 
		function() {
			document.getElementById('map-canvas').focus();
		}
	);
	
	let wrapper = document.getElementById('wrapper');
	wrapper.addEventListener('mousedown', 
		function() {
			mouseDown = true;
		}
	);
	wrapper.addEventListener('mouseup', 
		function() {
			mouseDown = false;
		}
	);
}