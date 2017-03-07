function Tag(tagName, orientation = 'left') {
	let tag = document.getElementById(tagName);
	tag.addEventListener('click', function(e) { 
		let panel = document.getElementById(tag.parentNode.id).querySelector('.panel');
		let parent = document.getElementById(tag.parentNode.id);
		let size = parent.offsetWidth - 18;
		
		//left tag start = -162 size = 200
		//right tag start = 30  size = 300
		//left tag end = 0 
		//right tag end = 282  
		
		let leftPos = getComputedStyle(parent).left;
		let end = -10;
		let sign = 0;
		
		let start = orientation == 'left' ? 0 : -282
		
		console.log('start:' + start)
	
		console.log('left Pos:' + leftPos + ' size:' + size);
		if(leftPos !=  start + 'px') {
			end = start;
			sign = orientation == 'left' ? 1 : 0;
		}
		else {
			end = orientation == 'left' ? -size : 30;
			sign = orientation == 'left' ? 0 : 1;
		}
		console.log('end:' + end);
		var pos = parseInt(leftPos);
		var id = setInterval(frame, 5);
		
		function frame() {
			if(pos !== end) {
				sign ? pos+=2 : pos-=2;
				parent.style.left = pos + 'px';
			}
			else {
				clearInterval(id);
			}
		}
	});
}