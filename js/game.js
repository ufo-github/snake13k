var Snake = Snake || {};

Snake.Game = {};

Snake.Game.state = {
	snake: [],
	direction: 'right', // 'right', 'left', 'top', 'down'
	newDirection: null,
	board: [],
	boardWidth: 30,
	boardHeight: 30,
	borderOffset: {
		top: 4,
		bottom: 2,
		left: 2,
		right: 2
	},
	holeInTheWall: false,
	score: 0,
	level: 1,
	mode: 'snake',
	prevLength: null, // real snake length (during tron mode),
	foodEaten: 0
};

// TODO: wrap in function and turn to local vars?
//       or make a 'class' with prototype
Snake.Game.vars = {
	then: null,
	animationId: null
};

Snake.Game.init = function() {
	this.ui = Snake.UI;
	this.controls = Snake.Controls;
	this.board = Snake.Board;

	this.ui.init(this.state);

	//TODO show menu or info
	//this.ui.showMainMenu();

	this.controls.addListeners(this.onInput.bind(this));

	//initialise the snake
	this.initSnake();

	//initialise the walls on the board
	this.board.initBoard(this.state);

	//initialise the food
	this.initFood();

	this.vars.then = performance.now();

	//start the game
	this.start();
};

Snake.Game.start = function() {
	this.vars.animationId = window.requestAnimationFrame(this.start.bind(this));

	var now = performance.now();
	var elapsed = now - this.vars.then;

	var fps = this.state.level + 4;
	// speed up in tron mode
	if (this.state.mode === 'tron') fps += 2;

	var fpsInterval = 1000 / fps;

	// if enough time has elapsed, draw the next frame
	if (elapsed > fpsInterval) {

		// Get ready for next frame by setting then=now, but also adjust for your
		// specified fpsInterval
		this.vars.then = now - (elapsed % fpsInterval);

		//paint the board in the game loop
		this.tick();
	}
};

Snake.Game.initSnake = function() {
	for (var i = 0; i < 5; i++) { //let's start with snake length 5
		//horizontal snake in the middle
		this.state.snake.push({x: ~~(this.state.boardWidth / 2) + i - 5, y: ~~(this.state.boardHeight / 2)});
	}
};

Snake.Game.random = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

Snake.Game.initFood = function() {
	this.initEdible('food');
};

Snake.Game.initBuggyBug = function() {
	this.initEdible('buggybug');
};

Snake.Game.initEdible = function(type) {
	var minX, maxX, minY, maxY, offset = 0;

	if (this.state.level === 1) { //first three foods always in the middle of the board
		offset = 1;
	}

	if (!this.state.holeInTheWall) {
		minX = this.state.borderOffset.left + offset;
		maxX = this.state.boardWidth - this.state.borderOffset.right - 1 - offset;

		minY = this.state.borderOffset.top + offset;
		maxY = this.state.boardHeight - this.state.borderOffset.bottom - 1 - offset;
	} else { //if there is a hole, edible can be outside of the board
		minX = minY = 0;
		maxX = this.state.boardWidth - 1;
		maxY = this.state.boardHeight - 1;
	}

	//make sure that the edible is not generated on the buggy bug, food or snake
	do {
		var randomX = this.random(minX, maxX);
		var randomY = this.random(minY, maxY);
	} while ((this.state.board[randomX][randomY].type === 'food')
		|| (this.state.board[randomX][randomY].type === 'buggybug')
		|| Snake.Game.ifCollidedWithSnake(randomX, randomY)
		|| (!this.state.holeInTheWall && //exclude walls in the corners if there is no hole yet
				((randomX === minX && randomY === minY)
				|| (randomX === minX && randomY === maxY)
				|| (randomX === maxX && randomY === minY)
				|| (randomX === maxX && randomY === maxY))));

	console.log('inside initEdible: ', type, minX, maxX, minY, maxY, randomX, randomY, this.state.holeInTheWall);

	//if edible happens to be on wall glitch opposite wall so snake can go through
	if (this.state.board[randomX][randomY].type === 'wall') {
		this.board.glitchOppositeWall(randomX, randomY);
		this.state.holeInTheWall = true;
	}

	Snake.Game.state.board[randomX][randomY] = {
		type: type
	};
};

Snake.Game.tick = function() {
	this.update();
	this.ui.paintBoard(this.state);
	this.ui.paintScore(this.state);
};

Snake.Game.update = function() {
	//take the snake's head
	var snakeX = this.state.snake[this.state.snake.length - 1].x;
	var snakeY = this.state.snake[this.state.snake.length - 1].y;

	// update direction based on input
	if (this.state.newDirection) {
		this.state.direction = this.state.newDirection;
	}

	if (this.state.direction === 'right') snakeX++;
	else if (this.state.direction === 'left') snakeX--;
	else if (this.state.direction === 'up') snakeY--;
	else if (this.state.direction === 'down') snakeY++;

	//if we will get out of the board
	if (snakeX === -1) {
		snakeX = this.state.boardWidth - 1;
	} else if (snakeX === this.state.boardWidth) {
		snakeX = 0;
	} else if (snakeY === -1) {
		snakeY = this.state.boardHeight - 1;
	} else if (snakeY === this.state.boardWidth) {
		snakeY = 0;
	}

	this.checkCollision(snakeX, snakeY);

	//if the new head position matches the food
	if (this.state.board[snakeX][snakeY].type === 'food') {
		this.consumeFood(snakeX, snakeY);
	} else if (this.state.board[snakeX][snakeY].type === 'buggybug') { //if the head position matches the buggy bug
		this.consumeBuggyBug(snakeX, snakeY);
	} else {
		if (this.state.mode === 'snake') {
			this.state.snake.shift(); //remove the first cell - tail
			//make it smaller in every paint
			/*if (this.state.prevLength && this.state.snake.length > this.state.prevLength) {
				this.state.snake.shift();
			} else if (this.state.prevLength && this.state.snake.length === this.state.prevLength) { //no need to make it smaller anymore
				this.state.prevLength = null;
			}*/
			//make the snake smaller immediately
			if (this.state.prevLength && this.state.snake.length > this.state.prevLength) {
				var elementsNo = this.state.snake.length - this.state.prevLength;
				this.state.snake.splice(0, elementsNo);
			} else if (this.state.prevLength && this.state.snake.length === this.state.prevLength) { //no need to make it smaller anymore
				this.state.prevLength = null;
			}
		} else {
			this.state.score += 1; //score one point for every piece grown in tron mode
		}
	}

	this.state.snake.push({
		x: snakeX,
		y: snakeY
	});
};

Snake.Game.consumeFood = function(snakeX, snakeY) {
	this.state.score += 1;
	this.state.foodEaten += 1;
	if (this.state.foodEaten % 3 === 0) this.state.level += 1;
	this.state.mode = 'snake'; //fix the snake so the tail can move
	this.state.board[snakeX][snakeY].type = '';
	if (this.state.prevLength) this.state.prevLength += 1;
	this.addAGlitch();
};

Snake.Game.consumeBuggyBug = function(snakeX, snakeY) {
	//add extra points and enlarge snake without moving the tail until normal food is eaten
	this.state.score += 1;
	this.state.mode = 'tron';
	this.state.board[snakeX][snakeY].type = '';
	this.state.prevLength = this.state.snake.length; //need to remember the actual length of the snake
};

Snake.Game.ifBuggyBugOnBoard = function() {
	return this.state.board.filter(function(row) {
		// filter only rows that contain buggy bug
		return row.filter(function(cell) {
			// filter only cells that are buggybug
			return cell.type === 'buggybug';
		}).length;
	}).length;
};

// TODO: refactor this, or remove?
Snake.Game.isFoodInLine = function (x, y) {
	var column = this.state.board[x];

	var foodInLine = column.filter(function(cell) {
		// filter only cells that are buggybug
		return cell.type === 'food' || cell.type === 'buggybug';
	}).length;

	if (foodInLine) {
		return true;
	}

	for (x = 0; x < this.state.boardWidth; x++) {
		var cell = this.state.board[x][y];
		if (cell.type === 'food' || cell.type === 'buggybug') {
			return true;
		}
	}
	return false;
};

Snake.Game.addAGlitch = function() {
	var randomGlitchType = this.random(1, 3); //1 - buggy bug, 2 - food, 3 - TODO glitched board?

	if (randomGlitchType === 1 && !this.ifBuggyBugOnBoard()) {
		this.initBuggyBug();
		this.initFood();
	} else {
		this.initFood();
	}
};

Snake.Game.checkCollision = function(snakeX, snakeY) {
	if (this.ifCollidedWithSnake(snakeX, snakeY) // if the snake will collide with itself
		|| (this.state.board[snakeX][snakeY].type === 'wall' // or if the snake will collide with the walls
				&& !this.state.board[snakeX][snakeY].isGlitched  // but not glitched walls
			/* && !this.isFoodInLine(snakeX, snakeY) */)) {

		//stop the game loop
		window.cancelAnimationFrame(this.vars.animationId);
		console.log('ifCollidedWithItself', this.ifCollidedWithSnake(snakeX, snakeY));
		console.log('ifCollidedWithWalls', this.state.board[snakeX][snakeY].type === 'wall');
		this.ui.showEndGame();
		//restart game ?
		//this.Game.init();
	}
};

Snake.Game.ifCollidedWithSnake = function(x, y) {
	//check if the x/y coordinates exist in the snake array
	return this.state.snake.filter(function(cell) {
		return cell.x === x && cell.y === y;
	}).length;
};

Snake.Game.onInput = function(newDirection) {
	// don't accept input with direction oposite to current
	if ((newDirection === 'right' && this.state.direction !== 'left') ||
			(newDirection === 'left' && this.state.direction !== 'right') ||
			(newDirection === 'up' && this.state.direction !== 'down') ||
			(newDirection === 'down' && this.state.direction !== 'up')) {
		this.state.newDirection = newDirection;
	}
};

Snake.Game.init();
