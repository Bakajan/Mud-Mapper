function Parser(inputText, actor = null) {
	let input = inputText.split(">>")[1];
	let commands = input.split(' ');
	this.result = '';

	if(commands[0].toUpperCase() === 'test'.toUpperCase())
		this.result = 'This is not a test!';
	else if(commands[0].toUpperCase() === 'roll'.toUpperCase()) {
		if(commands.length > 1) {
			if(!isNaN(commands[1])) 
				this.result = this.rollDice(commands[1]);
			else
				this.result = this.rollDice(1);
		}
		else
			this.result = this.rollDice(1);
	}
	else if(commands[0].toUpperCase() === 'look'.toUpperCase()) {
		if(commands.length > 1) {
			this.result = this.look(actor, commands[1]);
		}
		else {
			this.result = this.look(actor);
		}
	}
	else if(commands[0].toUpperCase() === 'north'.toUpperCase() || commands[0].toUpperCase() === 'n'.toUpperCase() ||
			commands[0].toUpperCase() === 'east'.toUpperCase() || commands[0].toUpperCase() === 'e'.toUpperCase() ||
			commands[0].toUpperCase() === 'west'.toUpperCase() || commands[0].toUpperCase() === 'w'.toUpperCase() ||
			commands[0].toUpperCase() === 'south'.toUpperCase() || commands[0].toUpperCase() === 's'.toUpperCase()) {
		this.result = this.move(actor, commands[0]);
	}
	else
		this.result = 'That is not possible.';
}
Parser.prototype.move = function(actor, direction) {
	let exits = map.getExits(map.getNode({x: actor.x, y: actor.y}));
	let dirs = '';
	Object.entries(exits).forEach(
		([key, value]) => {
			if(value.attributes)
				dirs += key + ',';
		}
	);
	
	if(direction == 'n')
		direction = 'north';
	if(direction == 'e')
		direction = 'east';
	if(direction == 'w')
		direction = 'west';
	if(direction == 's')
		direction = 'south';

	if(dirs.indexOf(direction) > -1) {
		if(direction == 'north')
			actor.y--;
		if(direction == 'east')
			actor.x++;
		if(direction == 'west')
			actor.x--;
		if(direction == 'south')
			actor.y++;
		
		let newExits = map.getExits(map.getNode({x: actor.x, y: actor.y}));
		dirs = '';
		Object.entries(newExits).forEach(
			([key, value]) => {
				if(value.attributes)
					dirs += key + ',';
			}
		);

		return [exits[direction].attributes['room-name'], '', exits[direction].attributes['sight'], '', 'Exits:' + dirs.substring(0, dirs.length-1)];
	}
	else
		return 'There\'s no exit.';
}
Parser.prototype.look = function(actor, direction = null) {
	if(direction == null) {
		let pos = map.getNode({x: actor.x, y: actor.y});
		let exits = map.getExits(map.getNode({x: actor.x, y: actor.y}));
		let dirs = '';
		Object.entries(exits).forEach(
			([key, value]) => {
				if(value.attributes)
					dirs += key + ',';
			}
		);
		
		return [pos.attributes['room-name'], '', 
		pos.attributes['sight'], '', 
		'Exits:' + dirs.substring(0, dirs.length-1)];
	}
	
	let exits = map.getExits(map.getNode({x: actor.x, y: actor.y}));
	let dirs = '';
	Object.entries(exits).forEach(
		([key, value]) => {
			if(value.attributes)
				dirs += key + ',';
		}
	);
	if(dirs.indexOf(direction) > -1) {
		let x = 0;
		let y = 0;
		
		if(direction == 'n') {
			direction = 'north';
			y+=actor.y - 1;
		}
		if(direction == 'e') {
			direction = 'east';
			x+=actor.x + 1;
		}
		if(direction == 'w') {
			direction = 'west';
			x+=actor.x - 1;
		}
		if(direction == 's') {
			direction = 'south';
			y+=actor.y + 1;
		}

		let pos = map.getNode({x: actor.x, y: actor.y});
		let exits = map.getExits(map.getNode({x: x, y: y}));
		let dirs = '';
		Object.entries(exits).forEach(
			([key, value]) => {
				if(value.attributes)
					dirs += key + ',';
			}
		);
		
		return [pos.attributes['room-name'], '', 
		pos.attributes['sight'], '', 
		'Exits:' + dirs.substring(0, dirs.length-1)];
	}
	else
		return 'Can\'t look that way';
	
	
}
Parser.prototype.rollDice = function(dice) {
	let roll = Math.floor((Math.random() * 5));
	let die = '';
	let total = 0;
	for(let i = 0; i != dice; i++) {
		roll = Math.floor((Math.random() * 5));
		total += roll + 1;
		console.log(dice);
		
		if(roll == 0)
			die += '\u2680';
		if(roll == 1)
			die += '\u2681';
		if(roll == 2)
			die += '\u2682';
		if(roll == 3)
			die += '\u2683';
		if(roll == 4)
			die += '\u2684';
		if(roll == 5)
			die += '\u2685';
	}
	
	die += ' = ' + total;

	return die;
}