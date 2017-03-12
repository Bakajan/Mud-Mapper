function ToolDrawer() {
	this.tag = new Tag('tool-tag', 'left');
	
	let pencil = document.getElementById('pencil-panel');
	pencil.addEventListener('click', 
		function() {
			if(selectedTool != 'pencil') {
				pencil.className += " tool-selected";
				pencil.style.color = 'gray';
				selectedTool = 'pencil';
			}
			else {
				pencil.className = pencil.className.replace(/\btool-selected\b/,'');
				selectedTool = '';
				pencil.style.color = 'black';
			}
			
			document.getElementById('selected-tool').innerHTML = 'Tool:' + selectedTool;
		}
	)
	
	let play = document.getElementById('play-panel');
	play.addEventListener('click', 
		function() {
			if(!playing) {
				play.className += " tool-selected";
				playing = true;
				screen = new Tester();
			}
			else {
				play.className = pencil.className.replace(/\btool-selected\b/,'');
				playing = false;
				screen = new Editor();
				screen.render(map);
			}
		}
	)
	
	let ascii = document.getElementById('ascii-panel');
	ascii.addEventListener('keypress', 
		function(e) {
			var keynum;
    
			if(window.event) { // IE                    
			  keynum = e.keyCode;
			} else if(e.which){ // Netscape/Firefox/Opera                   
			  keynum = e.which;
			}
			
			if(keynum > 32) {
				selectedAscii = String.fromCharCode(keynum);
				document.getElementById('ascii-panel').value = selectedAscii;
			}
		}
	)
}