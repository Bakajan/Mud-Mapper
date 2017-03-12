function NodeDrawer (map) {
	this.tag = new Tag('node-tag', 'right');

	for (var name in map.nodes[0].node.attributes) {
		if (typeof map.nodes[0].node.attributes[name] !== 'function') {
			let outter = document.createElement('div');
			let label = document.createElement('div')
			label.innerHTML = name + ':';
			let type = 'textarea';
			let className = 'textbox';
			if(name == 'ascii') {
				type = 'span';
				className = 'ascii';
			}
			else if(name == 'ascii-color') {
				type = 'div';
				className = "ascii-color jscolor {valueElement:null}";
			}
			let text = document.createElement(type);
			text.className = className;
			text.id = name;
			text.addEventListener('keyup', 
				function(e) {
					if(selectedNode !== '') {	
						let desc = document.getElementById(this.id);
						let attribute = this.id;
						
						map.setNode(selectedNode.x, selectedNode.y, attribute, desc.value);

						if(this.id == 'ascii') {
							let canvas = document.getElementById('map-canvas');
							let ctx = canvas.getContext('2d');
							ctx.clearRect(15 + ((selectedNode.x * 16) + (selectedNode.x * 10)), 15 + (selectedNode.y * 30), 16 + 10, 30); // clear canvas

							screen.drawNode(selectedNode, ctx);
							
							ctx.fillStyle = 'rgba(255,0,0,.5)';
							ctx.fillRect(15 + ((selectedNode.x * 16) + (selectedNode.x * 10)), 15 + (selectedNode.y * 30), 16 + 10, 30);
						}
					}
				}
			);
			text.addEventListener('blur', 
				function() {
					if(selectedNode !== '') {
						
					}
				}
			);
			
			outter.appendChild(label);
			outter.appendChild(text);
			
			element = document.getElementById("selected-node");
			element.appendChild(outter);
			
			let out = document.createElement('div');
			let lab = document.createElement('div')
			lab.innerHTML = name + ':';
			let hovered = document.createElement('textarea');
			hovered.id = 'hovered-' + name;
			hovered.style.width = '250px';
			hovered.disabled = true;
			hovered.style.background = 'lightgray';
			out.appendChild(lab);
			out.appendChild(hovered);
			
			ele = document.getElementById("hovered-node");
			ele.appendChild(out);
		}
	}
}