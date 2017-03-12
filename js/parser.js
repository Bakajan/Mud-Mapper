function Parser(inputText, actor = null) {
	let actions = {
		roll: {
			action: function(command, actor = null) {
				let dice = (!isNaN(commands[1])) ? command[1] : 1;
				let roll = Math.floor((Math.random() * 5));
				let die = '';
				let total = 0;
				for(let i = 0; i != dice; i++) {
					roll = Math.floor((Math.random() * 5));
					total += roll + 1;
					
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
			},
			description: function() {
				return 'Rolls a die or dice.'
			}
		},
		look: {
			action: function(commands, actor = null) {
				let direction = commands[1].toLowwerCase();

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
			},
			description: function(command) {
				return 'Looks into a room.'
			}
		},
		move: {
			action: function(direction, actor) {
				if(direction[0] == 'move') {
					if(direction[1])
						direction = direction[1];
					else
						return 'Must choose a direction.';
				}
				else 
					direction = direction;
				
				direction = direction.toLowerCase();
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

					return [
							exits[direction].attributes['room-name'], 
							exits[direction].attributes['area'], '', 
							exits[direction].attributes['sight'], '', 
							'Exits:' + dirs.substring(0, dirs.length-1)
						];
				}
				else
					return 'There\'s no exit.';
			},
			description: function(command) {
				return 'Moves into a room.'
			}
		},
		help: {
			action: function(options, actor = null) {
				if(options[1]) {
					if(actions.hasOwnProperty(options[1].toLowwerCase()))
						return actions[options[1]].description();
					else
						return 'That command doesn\'t exist';
				}
				else
					return 'Available commands: ' + Object.keys(actions).toString();
			}
		}
	}

	let input = inputText.split(">>")[1];
	let commands = input.split(' ');
	this.result = '';

	for (var key in actions) {
		if(commands[0].toUpperCase() === key.toUpperCase()) {
			this.result = actions[key].action(commands, actor);
			break;
		}
		else if(commands[0].toUpperCase() === 'north'.toUpperCase() || commands[0].toUpperCase() === 'n'.toUpperCase() ||
			commands[0].toUpperCase() === 'east'.toUpperCase() || commands[0].toUpperCase() === 'e'.toUpperCase() ||
			commands[0].toUpperCase() === 'west'.toUpperCase() || commands[0].toUpperCase() === 'w'.toUpperCase() ||
			commands[0].toUpperCase() === 'south'.toUpperCase() || commands[0].toUpperCase() === 's'.toUpperCase()) {
			this.result = actions['move'].action(commands[0], actor);
			break;
		}
		else
			this.result = 'That is not possible.';
	}
}
