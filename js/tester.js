function Tester() {
	this.actor = new Actor();
	this.lines.length = 0;
	let node = map.getNode({x: this.actor.x, y: this.actor.y});
	let canvas = document.getElementById('map-canvas');
	// Make it visually fill the positioned parent
	canvas.style.width ='100%';
	canvas.style.height='100%';
	// ...then set the internal size to match
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	let ctx = canvas.getContext('2d');
	
	ctx.clearRect(0,0,canvas.width,canvas.height); // clear canvas
	
	ctx.fillStyle = 'rgba(255,255,255,1)';
	ctx.font="20px monospace";
	
	let exits = map.getExits(node);
	let dirs = '';
	Object.entries(exits).forEach(
		([key, value]) => {
			if(value.attributes)
				//console.log(key, value.attributes['room-name']);
				dirs += key + ',';
		}
	);
	
	this.addLine(node.attributes.area);
	this.addLine('');
	this.addLine(node.attributes.sight);
	this.addLine('');
	this.addLine('Exits: ' + dirs.substring(0, dirs.length-1));
	this.addLine('');
	this.addLine('>>');
	
	this.render();
}
Tester.prototype.lines = [];
Tester.prototype.history = [];
Tester.prototype.addLine = function (line) {
	if(line.constructor !== Array) {
		let value = line;
		line = [line];
	}
	
	for(let i = 0; i != line.length; i++) {
		this.lines.push(line[i]);
	}	
}
Tester.prototype.render = function(map = null) {
	let canvas = document.getElementById('map-canvas');
	let ctx = canvas.getContext('2d');
	canvas.style.height = this.totalLines(ctx, canvas.offsetWidth) * 20;
	canvas.height = canvas.offsetHeight;

	let width = document.getElementById('map-canvas').offsetWidth;
	let height = document.getElementById('map-canvas').offsetHeight;
	let maxLines = Math.floor(height / 20);
	let line = '';
	let x = 10;
	let y = 20;
	let lineHeight = 20;
	let counter = 0;

	ctx.fillStyle = 'rgba(255,255,255,1)';
	ctx.font="20px monospace";
	for(let i = 0; i != this.lines.length; i++) { 
		let text = this.lines[i].split(' ');
		
		for(let n = 0; n != text.length; n++) {
		  let testLine = line + text[n] + ' ';
		  var metrics = ctx.measureText(testLine);
		  var testWidth = metrics.width;
		  if (testWidth > width) {
			ctx.fillText(line, x, y);
			line = text[n] + ' ';
			y += lineHeight;
		  }
		  else {
			line = testLine;
		  }
		}
		ctx.fillText(line, x, y);
		line = '';
		y+= lineHeight;
		counter++;
	}
	ctx.fillText(line, x, y);
	//lastLine = { x: x, y:y };
}
Tester.prototype.totalLines = function(ctx, width) {
	let line = '';
	let lines = '';
	let lineCount = 0;
	for(let i = 0; i < this.lines.length; i++) { 
		let text = this.lines[i].split(' ');
		for(let n = 0; n != text.length; n++) {
		  let testLine = line + text[n] + ' ';
		  var metrics = ctx.measureText(testLine);
		  var testWidth = metrics.width;
		  if (testWidth > width) {
			line = text[n] + ' ';
			lineCount++;
		  }
		  else {
			line = testLine;
		  }
		}
		line = '';
		lineCount++;
	}
	
	return lineCount;
}
Tester.prototype.clearScreen = function() {
	let ctx = document.getElementById('map-canvas').getContext('2d');
	let width = document.getElementById('map-canvas').offsetWidth;
	let height = document.getElementById('map-canvas').offsetHeight;
	
	ctx.clearRect(0,0,width,height);
}
Tester.prototype.keyPress = function(e, ctx) {
	let keynum = (e.keyCode ? e.keyCode : e.which);
	
	if(keynum > 31 && keynum < 127) {
		this.lines[this.lines.length-1] += String.fromCharCode(keynum);
		this.render();
	}
	else if(keynum == 13) { //Enter keycode
		let input = this.lines[this.lines.length-1];
		let parser = new Parser(input, this.actor);
		this.addLine('');
		this.addLine(parser.result);
		this.addLine('');
		this.addLine('>>');
		this.render();
		
		var objDiv = document.getElementById("map-panel");
		objDiv.scrollTop = objDiv.scrollHeight;
		
		this.history.push(parser.result);
	}
}
Tester.prototype.keyUp = function(e, ctx) {
	let keynum = (e.keyCode ? e.keyCode : e.which);
	
	if(keynum == 8 || keynum == 46) { // Backspace or Delete
		if(this.lines[this.lines.length-1].length > 2) {
			this.lines[this.lines.length-1] = this.lines[this.lines.length-1].substring(0, this.lines[this.lines.length-1].length-1);
			this.clearScreen(ctx);
			this.render();
		}
	}
	if(keynum == 38) { // up arrow
		
	}
	if(keynum == 40) { // down arrow
		
	}
}
Tester.prototype.mouseMove = function(e, canvas, ctx) {

}
Tester.prototype.click = function(e, ctx) {

}